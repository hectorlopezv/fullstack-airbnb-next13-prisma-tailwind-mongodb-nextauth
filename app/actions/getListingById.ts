import prisma from "@/app/libs/prismadb";

export async function getListingById(id: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
