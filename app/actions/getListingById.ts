import { getServerSession } from "next-auth";
import { authOptions } from "../libs/authOptions";
import prisma from "@/app/libs/prismadb";
import { SafeUser } from "../types";
import getSession from "./getSession";

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
