import { registerModalValidator } from "@/app/libs/validators/registerModalValidator";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { confirmPassword, email, name, password } =
      registerModalValidator.parse(body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD_REQUEST", { status: 422 });
    }
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
}
