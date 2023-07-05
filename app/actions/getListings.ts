import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string | null;
  guestCount?: number | null;
  roomCount?: number | null;
  bathroomCount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  locationValue?: string | null;
  category?: string | null;
}

export async function getListing(params: IListingsParams) {
  try {
    let query: any = {};

    if (params?.userId) {
      query.userId = params?.userId;
    }

    if (params?.category) {
      query.category = params?.category;
    }

    if (params?.roomCount) {
      query.roomCount = {
        gte: +params?.roomCount,
      };
    }

    if (params?.guestCount) {
      query.guestCount = {
        gte: +params?.guestCount,
      };
    }

    if (params?.bathroomCount) {
      query.bathroomCount = {
        gte: +params?.bathroomCount,
      };
    }

    if (params?.locationValue) {
      query.locationValue = params?.locationValue;
    }

    if (params?.startDate && params?.endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: params?.startDate },
                startDate: { lte: params?.startDate },
              },
              {
                startDate: { lte: params?.endDate },
                endDate: { gte: params?.endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
