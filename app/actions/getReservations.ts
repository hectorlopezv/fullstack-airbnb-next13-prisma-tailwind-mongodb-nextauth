import prisma from "@/app/libs/prismadb";
interface IPartams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}
export async function getReservations(params: IPartams) {
  try {
    const { authorId, listingId, userId } = params;
    const query: any = {};
    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }
    const listings = await prisma.reservation.findMany({
      orderBy: {
        createAt: "desc",
      },
      where: query,
      include: {
        listing: true,
      },
    });

    return listings;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
