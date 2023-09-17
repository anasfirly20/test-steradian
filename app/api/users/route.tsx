import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
import { hash } from "bcrypt";

// GET ALL USERS
export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// ADD USER
export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await hash(body.password, 10);
  const userNew = await prisma.user.create({
    data: {
      email: body.email,
      phoneNumber: body.phoneNumber,
      city: body.city,
      zip: body.zip,
      message: body.message,
      password: hashedPassword,
      username: body.username,
      address: body.address,
    },
  });
  const { password, ...rest } = userNew;

  return NextResponse.json(rest, { status: 201 });
}
