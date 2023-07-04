import prisma from "@/app/libs/prismadb";

export async function getListing() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
