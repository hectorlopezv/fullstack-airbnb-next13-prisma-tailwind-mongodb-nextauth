import { getListingById } from "@/app/actions/getListingById";
import { getCurrentUser } from "@/app/actions/getSession";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "@/app/components/listings/ListingClient";
import { useParams } from "next/navigation";

type Props = {
  params: {
    listingId: string;
  };
};

export default async function ListingPage({ params: { listingId } }: Props) {
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();
  if (!listing) {
    return <EmptyState />;
  }
  return <ListingClient listing={listing} currentUser={currentUser} />;
}
