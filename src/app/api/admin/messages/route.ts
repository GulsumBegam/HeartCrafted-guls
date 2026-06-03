import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
