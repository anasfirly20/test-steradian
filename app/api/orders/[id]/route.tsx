import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

type TProps = {
  params: { id: string };
};

// GET order by id
export async function GET(req: NextRequest, { params }: TProps) {
  const order = await prisma.order.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}

// DELETE order by id
export async function DELETE(req: NextRequest, { params }: TProps) {
  const order = await prisma.order.findUnique({
    where: { id: parseInt(params.id) },
  });

  await prisma.order.delete({
    where: { id: order?.id },
  });

  return NextResponse.json({ message: "Order successfully deleted" });
}
