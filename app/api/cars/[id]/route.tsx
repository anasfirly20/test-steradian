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

// DELETE car by id
export async function DELETE(req: NextRequest, { params }: TProps) {
  const car = await prisma.car.findUnique({
    where: { id: parseInt(params.id) },
  });

  await prisma.car.delete({
    where: { id: car?.id },
  });

  return NextResponse.json({ message: "Car successfully deleted" });
}

// PUT car by id
export async function PUT(req: NextRequest, { params }: TProps) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const car = await prisma.car.findUnique({
    where: { id: parseInt(params.id) },
  });

  const updatedCar = await prisma.car.update({
    where: { id: car?.id },
    data: {
      name: body.name,
      carType: body.carType,
      rating: body.rating,
      fuel: body.fuel,
      image: body.image,
      hourRate: body.hourRate,
      dayRate: body.dayRate,
      monthRate: body.monthRate,
      orderId: body.orderId,
    },
  });

  return NextResponse.json(updatedCar, { status: 201 });
}
