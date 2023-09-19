import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

type TProps = {
  params: { id: string };
};

// GET admin by id
export async function GET(req: NextRequest, { params }: TProps) {
  const admin = await prisma.admin.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      order: {
        select: {
          id: true,
          userId: true,
          adminId: true,
        },
      },
    },
  });

  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  return NextResponse.json(admin);
}

// PUT admin by id
export async function PUT(req: NextRequest, { params }: TProps) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!admin) {
    return NextResponse.json({ error: "Admin not found." }, { status: 404 });
  }

  const updatedUser = await prisma.admin.update({
    where: { id: admin.id },
    data: {
      email: body.email,
      password: body.password,
    },
  });

  return NextResponse.json(updatedUser);
}

// DELETE admin by id
export async function DELETE(req: NextRequest, { params }: TProps) {
  const admin = await prisma.admin.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!admin) {
    return NextResponse.json({ error: "Admin not found." }, { status: 404 });
  }

  await prisma.admin.delete({
    where: { id: admin.id },
  });

  return NextResponse.json({});
}
