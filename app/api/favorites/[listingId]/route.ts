import { getCurrentUser } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { type } from "os";
interface Iparams {
  listingId?: string;
}
export async function POST(request: Request, { params }: { params: Iparams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    const listingId = params?.listingId;
    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
    }
    let favoriteIds = [...(currentUser?.favoritesIds || [])];

    const user = await prisma.user.update({
      data: {
        favoritesIds: [...favoriteIds, listingId],
      },
      where: {
        id: currentUser.id,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    const listingId = params?.listingId;
    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
    }
    let favoriteIds = [...(currentUser?.favoritesIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoritesIds: favoriteIds,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
