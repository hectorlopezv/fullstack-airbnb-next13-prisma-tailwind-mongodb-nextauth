import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getSession";

export async function getFavoritesListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoritesIds || [])],
        },
      },
    });

    return favorites;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
