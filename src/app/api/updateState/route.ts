import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    console.log("Received DELETE request with id:", id); // Log the received id
    if (!id) {
      throw new Error("Invalid input data");
    }

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in DELETE:", err); // Log the error
    return NextResponse.json(
      { error: "Internal Error", details: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, todo } = await request.json();
    console.log("Received PUT request with id:", id, "and todo:", todo); // Log the received id and todo
    if (!id || !todo) {
      throw new Error("Invalid input data");
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { todo },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (err) {
    console.error("Error in PUT:", err); // Log the error
    return NextResponse.json(
      { error: "Internal Error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
