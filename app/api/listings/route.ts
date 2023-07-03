import { z } from "zod";
import { getCurrentUser } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { listingslValidator } from "@/app/libs/validators/listingsValidator";
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }
    const body = await request.json();
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = listingslValidator.parse(body);
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(String(price), 10),
        userId: currentUser.id,
      },
    });
    return NextResponse.json(listing);
  } catch (error) {
    console.log("error", error);
    if (error instanceof z.ZodError) {
      return NextResponse.error();
    }
    return new NextResponse("Internal server error", { status: 500 });
  }
}
