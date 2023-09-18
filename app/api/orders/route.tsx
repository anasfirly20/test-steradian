import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

// GET ALL ORDERS
export async function GET(req: NextRequest) {
  const orders = await prisma.order.findMany();
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
      userId: body.userId, // Connect the order to the user using the user's ID
      adminId: body.adminId, // Connect the order to the admin using the admin's ID
    },
  });

  return NextResponse.json(orderNew, { status: 201 });
}
