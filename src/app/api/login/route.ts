// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     console.log("Received login request:", body);

//     const { email, password } = body;

//     if (!email || !password) {
//       console.error("Invalid input data");
//       return NextResponse.json(
//         { error: "Invalid input data" },
//         { status: 400 }
//       );
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       console.error("User not found");
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       console.error("Invalid email or password");
//       return NextResponse.json(
//         { error: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

//     console.log("Login successful:", user);
//     return NextResponse.json(
//       { message: "Login successful", user },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Error logging in user:", err);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: (err as Error).message },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }
