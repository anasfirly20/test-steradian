import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// GET ALL USERS
export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
