// src/app/api/todo/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { todo } = await request.json();
    if (!todo) {
      throw new Error("Todo content is required");
    }

    const newTodo = await prisma.todo.create({
      data: {
        todo,
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

export async function GET() {
  try {
    const todoList = await prisma.todo.findMany();
    return NextResponse.json(todoList, { status: 200 });
  } catch (err) {
    console.error("Error fetching todos:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
