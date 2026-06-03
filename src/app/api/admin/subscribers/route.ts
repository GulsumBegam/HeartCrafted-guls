import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json(subscribers);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
