import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { todo } = await request.json();
    if (!todo || !todo.id || !todo.content || !todo.dateCreated) {
      throw new Error("Invalid input data");
    }

    const newTodo = await prisma.todo.create({
      data: {
        id: todo.id,
        todo: todo.content,
        dateCreated: todo.dateCreated,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (err) {
    console.error("Error creating todo:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
