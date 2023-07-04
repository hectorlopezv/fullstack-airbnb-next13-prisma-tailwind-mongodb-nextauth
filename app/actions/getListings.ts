import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
}
export async function getListing(params: IListingParams) {
  try {
    const { userId } = params;
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }
    const listings = await prisma.listing.findMany({
      orderBy: {
        createAt: "desc",
      },
      where: query,
    });

    return listings;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
