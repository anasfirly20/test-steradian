import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Check if the user with the provided email exists in the database
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  if (user.password !== body.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  // If the credentials are valid, generate a JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    "your-secret-key",
    { expiresIn: "1h" } // You can adjust the expiration time as needed
  );

  console.log("ERROR 5");
  NextResponse.json(token, { status: 200 });
}
