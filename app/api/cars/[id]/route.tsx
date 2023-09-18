import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

type TProps = {
  params: { id: string };
};

// GET car by id
export async function GET(req: NextRequest, { params }: TProps) {
  const car = await prisma.car.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      order: true,
    },
  });

  if (!car) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  return NextResponse.json(car);
}

// DELETE order by id
export async function DELETE(req: NextRequest, { params }: TProps) {
  const car = await prisma.car.findUnique({
    where: { id: parseInt(params.id) },
  });

  await prisma.car.delete({
    where: { id: car?.id },
  });

  return NextResponse.json({ message: "Car successfully deleted" });
}
