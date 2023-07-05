import { IListingsParams, getListing } from "./actions/getListings";
import { getCurrentUser } from "./actions/getSession";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import Container from "./components/navbar/Container";
interface HomeProps {
  searchParams: IListingsParams;
}
export const dynamic = "force-dynamic";
export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListing(searchParams);
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div
        className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8
  "
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
