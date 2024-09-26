// find user
// get password from FOUND user
// compare with an if statment with the password of user

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) {
      throw new Error("User was not found");
    }
    if (password != findUser.password) {
      throw new Error("password was incorrect");
    }
    return NextResponse.json(findUser.id, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error creating user", details: (err as Error).message },
      { status: 500 }
    );
  }
}
