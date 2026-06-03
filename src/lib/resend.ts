import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactConfirmation(
  name: string,
  email: string
): Promise<void> {
  try {
    await resend.emails.send({
      from: "HeartCrafted <forever@heartcrafted.com>",
      to: email,
      subject: "We received your message ✨",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fff8f6; padding: 40px; border-radius: 16px;">
          <h1 style="color: #7f5443; font-size: 28px; margin-bottom: 8px;">Dear ${name},</h1>
          <p style="color: #51443f; font-size: 16px; line-height: 1.6;">Thank you for reaching out to HeartCrafted. Your message has been received and we'll respond within 24 hours.</p>
          <p style="color: #51443f; font-size: 16px; line-height: 1.6; margin-top: 24px;">Every story deserves to be crafted with love.</p>
          <p style="color: #7f5443; font-size: 14px; margin-top: 32px; font-style: italic;">— The HeartCrafted Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact confirmation:", error);
  }
}

export async function sendOrderConfirmation(
  name: string,
  email: string,
  orderId: string,
  giftType: string
): Promise<void> {
  try {
    await resend.emails.send({
      from: "HeartCrafted <forever@heartcrafted.com>",
      to: email,
      subject: `Your ${giftType} is being crafted with love 💝`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fff8f6; padding: 40px; border-radius: 16px;">
          <h1 style="color: #7f5443; font-size: 28px; margin-bottom: 8px;">Order Confirmed, ${name}!</h1>
          <p style="color: #51443f; font-size: 16px; line-height: 1.6;">Your order <strong>#${orderId.slice(-8).toUpperCase()}</strong> for a <strong>${giftType}</strong> has been confirmed. Our artisans are ready to craft your story.</p>
          <div style="background: rgba(127,84,67,0.05); border: 1px solid rgba(127,84,67,0.2); border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p style="color: #7f5443; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">Estimated Delivery: 7–10 Business Days</p>
          </div>
          <p style="color: #7f5443; font-size: 14px; margin-top: 32px; font-style: italic;">— The HeartCrafted Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send order confirmation:", error);
  }
}

export async function sendNewsletterConfirmation(
  email: string,
  name?: string
): Promise<void> {
  try {
    await resend.emails.send({
      from: "HeartCrafted <forever@heartcrafted.com>",
      to: email,
      subject: "Welcome to HeartCrafted Stories ✨",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fff8f6; padding: 40px; border-radius: 16px;">
          <h1 style="color: #7f5443; font-size: 28px; margin-bottom: 8px;">${name ? `Welcome, ${name}!` : "Welcome!"}</h1>
          <p style="color: #51443f; font-size: 16px; line-height: 1.6;">You're now part of the HeartCrafted family. Expect stories, gift inspirations, and exclusive offers crafted just for you.</p>
          <p style="color: #7f5443; font-size: 14px; margin-top: 32px; font-style: italic;">— The HeartCrafted Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send newsletter confirmation:", error);
  }
}
