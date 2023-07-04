import axios from "axios";
import useLoginModal from "./useLoginModal";
import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};
export const useFavorite = ({ currentUser, listingId }: Props) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoritesIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);
  const toogleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        loginModal.onOpen();
        return;
      }
      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success!");
      } catch (error) {
        console.log("error", error);
        toast.error("Something went wrong, please try again later.");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );
  return { hasFavorited, toogleFavorite };
};
