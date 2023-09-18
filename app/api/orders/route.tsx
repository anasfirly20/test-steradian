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

  // Assuming you have some way to identify the user and admin, such as email or ID
  const userEmail = body.userEmail; // Replace with your logic to get the user's email
  const adminEmail = body.adminEmail; // Replace with your logic to get the admin's email

  // Find the user and admin by their emails (you can use ID or any other unique identifier)
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  const admin = await prisma.admin.findUnique({
    where: {
      email: adminEmail,
    },
  });
  console.log("ERROR 4");

  if (!user || !admin) {
    return NextResponse.json(
      { error: "User or admin not found" },
      { status: 404 }
    );
  }

  const orderNew = await prisma.order.create({
    data: {
      pickUpLoc: body.pickUpLoc,
      dropOffLoc: body.dropOffLoc,
      pickUpTime: body.pickUpTime,
      userId: user.id, // Connect the order to the user using the user's ID
      adminId: admin.id, // Connect the order to the admin using the admin's ID
    },
  });

  return NextResponse.json(orderNew, { status: 201 });
}
