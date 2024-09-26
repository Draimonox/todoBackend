import { NextResponse } from "next/server";
import prisma from "../../../../src/lib/prisma";

export async function POST(request: Request) {
  try {
    const { todo, id } = await request.json();
    if (!todo) {
      throw new Error("Todo content is required");
    }

    const newTodo = await prisma.todo.create({
      data: {
        todo,
        author: {
          connect: {
            id,
          },
        },
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
