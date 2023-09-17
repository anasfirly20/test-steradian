import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

type TProps = {
  params: { id: string };
};

// GET user by id
export async function GET(req: NextRequest, { params }: TProps) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PUT by id
export async function PUT(req: NextRequest, { params }: TProps) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      email: body.email,
      phoneNumber: body.phoneNumber,
      city: body.city,
      zip: body.zip,
      message: body.message,
      password: body.password,
      username: body.username,
      address: body.address,
    },
  });

  return NextResponse.json(updatedUser);
}

// DELETE by id
export async function DELETE(req: NextRequest, { params }: TProps) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const deletedUser = await prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json({});
}
