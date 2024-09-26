import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { email, password } = await request.json();
    const newUser = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error creating user", details: (err as Error).message },
      { status: 500 }
    );
  }
}
