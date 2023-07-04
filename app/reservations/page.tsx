import { getReservations } from "../actions/getReservations";
import { getCurrentUser } from "../actions/getSession";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "../components/reservations/ReservationsClient";


type Props = {};

export default async function ReservationsPage({}: Props) {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unoathorized" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservatuibs found"
        subtitle="Looks like you have no reservations in progress"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}
