import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

// GET ALL ORDERS
export async function GET(req: NextRequest) {
  const orders = await prisma.order.findMany({
    include: {
      car: true,
      user: true,
      admin: true,
    },
    orderBy: {
      pickUpDate: "asc",
    },
  });
  return NextResponse.json(orders);
}

// ADD ORDER
export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const orderNew = await prisma.order.create({
    data: {
      pickUpLoc: body.pickUpLoc,
      dropOffLoc: body.dropOffLoc,
      pickUpTime: body.pickUpTime,
      pickUpDate: body.pickUpDate,
      dropOffDate: body.dropOffDate,
      userId: body.userId,
      adminId: body.adminId,
    },
  });

  return NextResponse.json(orderNew, { status: 201 });
}
