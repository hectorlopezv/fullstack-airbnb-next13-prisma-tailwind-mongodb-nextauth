import { getCurrentUser } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { reservationValidator } from "@/app/libs/validators/reservationsValidator";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { listingId, startDate, endDate, totalPrice } =
      reservationValidator.parse(body);

    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            startDate,
            endDate,
            totalPrice,
            userId: currentUser.id,
          },
        },
      },
    });
    return NextResponse.json(listingAndReservation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("INVALID PAYLOAD", { status: 400 });
    }
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
