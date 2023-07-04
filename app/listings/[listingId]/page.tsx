import { getListingById } from "@/app/actions/getListingById";
import { getReservations } from "@/app/actions/getReservations";
import { getCurrentUser } from "@/app/actions/getSession";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "@/app/components/listings/ListingClient";
import { Reservation } from "@prisma/client";
import { useParams } from "next/navigation";

type Props = {
  params: {
    listingId: string;
  };
};

export default async function ListingPage({ params }: Props) {
  const listing = await getListingById(params.listingId);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return <EmptyState />;
  }
  return (
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
}
