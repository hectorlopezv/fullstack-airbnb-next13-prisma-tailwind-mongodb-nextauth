import { getServerSession } from "next-auth";
import { authOptions } from "../libs/authOptions";
import prisma from "@/app/libs/prismadb";
import { SafeUser } from "../types";
import getSession from "./getSession";

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
