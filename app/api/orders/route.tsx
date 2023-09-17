import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
import { createUser } from "../helpers/user";
import { createAdmin } from "../helpers/admin";

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

  const user = await createUser();
  const admin = await createAdmin();

  const orderNew = await prisma.order.create({
    data: {
      pickUpLoc: body.pickUpLoc,
      dropOffLoc: body.dropOffLoc,
      pickUpTime: body.pickUpTime,
      user: {
        connect: {
          id: user.id,
        },
      },
      admin: {
        connect: {
          id: admin.id,
        },
      },
    },
    include: {
      user: true,
      admin: true,
    },
  });

  console.log("orderNew >>", orderNew);
  return NextResponse.json(orderNew, { status: 201 });
}
