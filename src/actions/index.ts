"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  sendContactConfirmation,
  sendOrderConfirmation,
  sendNewsletterConfirmation,
} from "@/lib/resend";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

const OrderSchema = z.object({
  giftType: z.string().min(1, "Gift type is required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  occasion: z.string().min(1, "Occasion is required"),
  story: z.string().min(20, "Please share at least a brief story"),
  theme: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  photoUrls: z.array(z.string()).optional(),
  voiceUrl: z.string().optional(),
});

export type ActionResult = {
  success: boolean;
  message: string;
  data?: unknown;
};

export async function submitContactForm(
  formData: z.infer<typeof ContactSchema>
): Promise<ActionResult> {
  try {
    const validated = ContactSchema.parse(formData);

    let saved = false;
    try {
      await prisma.contactMessage.create({ data: validated });
      saved = true;
    } catch {
      // DB not configured - gracefully skip
    }

    if (saved) {
      await sendContactConfirmation(validated.name, validated.email);
    }

    return {
      success: true,
      message: "Your message has been received. We'll be in touch within 24 hours.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function subscribeNewsletter(
  formData: z.infer<typeof NewsletterSchema>
): Promise<ActionResult> {
  try {
    const validated = NewsletterSchema.parse(formData);

    try {
      await prisma.newsletterSubscriber.upsert({
        where: { email: validated.email },
        update: {},
        create: validated,
      });
    } catch {
      // DB not configured - gracefully skip
    }

    await sendNewsletterConfirmation(validated.email, validated.name);

    return {
      success: true,
      message: "Welcome to the HeartCrafted family! Check your inbox.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function submitCustomOrder(
  formData: z.infer<typeof OrderSchema>
): Promise<ActionResult> {
  try {
    const validated = OrderSchema.parse(formData);

    let orderId = `HC${Date.now()}`;

    try {
      const order = await prisma.customOrder.create({
        data: {
          giftType: validated.giftType,
          recipientName: validated.recipientName,
          occasion: validated.occasion,
          story: validated.story,
          theme: validated.theme,
          email: validated.email,
          phone: validated.phone,
          photoUrls: validated.photoUrls || [],
          voiceUrl: validated.voiceUrl,
        },
      });
      orderId = order.id;
      await sendOrderConfirmation(
        validated.recipientName,
        validated.email,
        orderId,
        validated.giftType
      );
    } catch {
      // DB not configured - gracefully skip
    }

    return {
      success: true,
      message: "Your order has been received! Our artisans will begin crafting your story.",
      data: { orderId },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function getOrderStatus(orderId: string): Promise<ActionResult> {
  try {
    const order = await prisma.customOrder.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        giftType: true,
        recipientName: true,
        createdAt: true,
      },
    });

    if (!order) {
      return { success: false, message: "Order not found" };
    }

    return { success: true, message: "Order found", data: order };
  } catch {
    return { success: false, message: "Could not retrieve order status" };
  }
}
