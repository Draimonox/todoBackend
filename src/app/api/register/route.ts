// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   try {
//     const { userInfo } = await request.json();

//     // Validate input data
//     if (
//       !userInfo ||
//       !userInfo.id ||
//       !userInfo.name ||
//       !userInfo.email ||
//       !userInfo.password ||
//       !userInfo.dateCreated
//     ) {
//       return NextResponse.json(
//         { error: "Invalid input data" },
//         { status: 400 }
//       );
//     }

//     const newUser = await prisma.user.create({
//       data: {
//         id: userInfo.id,
//         createdAt: userInfo.dateCreated,
//         email: userInfo.email,
//         name: userInfo.name,
//         password: userInfo.password,
//       },
//     });

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (err) {
//     console.error("Error creating user:", err);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: (err as Error).message },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }
