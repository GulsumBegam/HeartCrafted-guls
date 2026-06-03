import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.customOrder.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        giftType: true,
        recipientName: true,
        email: true,
        occasion: true,
        status: true,
        createdAt: true,
      },
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
