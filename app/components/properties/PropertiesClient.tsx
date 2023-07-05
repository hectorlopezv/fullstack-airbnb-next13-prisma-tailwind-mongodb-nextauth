"use client";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Container from "../navbar/Container";
import ListingCard from "../listings/ListingCard";

type Props = {
  currentUser?: SafeUser | null;
  listing: any[];
};

export default function PropertiesClient({ listing, currentUser }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property deleted");
          setDeletingId("");
          router.refresh();
        })
        .catch(() => {
          toast.error("Error deleting property");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listing.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            actionId={listing.id}
          />
        ))}
      </div>
    </Container>
  );
}
