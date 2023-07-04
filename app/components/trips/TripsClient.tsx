"use client";
import { SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import Container from "../navbar/Container";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../listings/ListingCard";

type Props = {
  reservations: any[];
  currentUser?: SafeUser | null;
};

export default function TripsClient({ reservations, currentUser }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          setDeletingId("");
          router.refresh();
        })
        .catch(() => {
          toast.error("Error cancelling reservation");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {reservations.map((reservation) => (
          <ListingCard
            reservation={reservation}
            key={reservation.id}
            data={reservation.listing}
            actionId={reservation.id}
            actionLabel="Cancel Reservation"
            onAction={onCancel}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
