import { NextResponse } from "next/server";
import prisma from "../../../../src/lib/prisma";
import { headers } from "next/headers";

// Define types for request body
interface CreateTodoRequest {
  todo: string;
  author: string;
}

export async function POST(request: Request) {
  try {
    const { todo, author }: CreateTodoRequest = await request.json();

    if (!todo) {
      return NextResponse.json(
        { error: "Todo content is required" },
        { status: 400 }
      );
    }

    if (!author) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const newTodo = await prisma.todo.create({
      data: {
        todo,
        author: { connect: { id: author } },
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

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("authorization");
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 403 });
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 403 });
    }

    const todoList = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json(todoList, { status: 200 });
  } catch (err) {
    console.error("Error fetching todos:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
