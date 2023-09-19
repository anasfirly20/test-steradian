import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
import { hash } from "bcrypt";

// GET ALL ADMINS
export async function GET(req: NextRequest) {
  const admins = await prisma.admin.findMany();
  return NextResponse.json(admins);
}

// ADD ADMIN
export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({
    where: { email: body.email },
  });

  if (admin) {
    return NextResponse.json(
      { error: "Admin already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await hash(body.password, 10);
  const adminNew = await prisma.admin.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  const { password, ...rest } = adminNew;

  return NextResponse.json(rest, { status: 201 });
}
