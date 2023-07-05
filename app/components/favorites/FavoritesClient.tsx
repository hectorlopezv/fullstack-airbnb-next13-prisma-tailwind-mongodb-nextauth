
import { SafeUser } from "@/app/types";
import { Listing } from "@prisma/client";
import Container from "../navbar/Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";

type Props = {
  listings: Listing[];
  currentUser?: SafeUser | null;
};

export default function FavoritesClient({ listings, currentUser }: Props) {
  return (
    <Container>
      <Heading title="Favorites" subtitle="Your Favorites properties" />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
