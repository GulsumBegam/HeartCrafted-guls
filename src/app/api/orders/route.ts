import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Order ID required" }, { status: 400 });
  }

  try {
    const order = await prisma.customOrder.findUnique({
      where: { id },
      select: {
        id: true,
        giftType: true,
        recipientName: true,
        occasion: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch {
    return NextResponse.json(
      { error: "Could not retrieve order. Database may not be configured." },
      { status: 500 }
    );
  }
}
