import { getCurrentUser } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { reservationValidator } from "@/app/libs/validators/reservationsValidator";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!id || typeof id !== "string") {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: id,
        OR: [
          {
            userId: currentUser.id,
          },
          {
            listing: { userId: currentUser.id },
          },
        ],
      },
    });
    return NextResponse.json(reservation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("INVALID PAYLOAD", { status: 400 });
    }
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
