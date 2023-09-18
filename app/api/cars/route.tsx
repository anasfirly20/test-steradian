import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

// GET ALL CARS
export async function GET(req: NextRequest) {
  const cars = await prisma.car.findMany({
    include: {
      order: true,
    },
  });
  return NextResponse.json(cars);
}

// ADD CAR
export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const carNew = await prisma.car.create({
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

  return NextResponse.json(carNew, { status: 201 });
}
