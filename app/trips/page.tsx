import { getReservations } from "../actions/getReservations";
import { getCurrentUser } from "../actions/getSession";
import EmptyState from "../components/EmptyState";
import TripsClient from "../components/trips/TripsClient";

type Props = {};

export default async function TripsPage({}: Props) {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unoathorized" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    return <EmptyState title="No trips" subtitle="You have no trips" />;
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}
