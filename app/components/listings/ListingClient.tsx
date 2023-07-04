"use client";
import { categories } from "@/app/libs/constants";
import { SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import { list } from "postcss";
import { useMemo } from "react";
import Container from "../navbar/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

type Props = {
  currentUser?: SafeUser | null;
  listing: Listing & {
    user: User;
  };
  reservations?: Reservation[];
};

export default function ListingClient({ listing, currentUser }: Props) {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing?.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
