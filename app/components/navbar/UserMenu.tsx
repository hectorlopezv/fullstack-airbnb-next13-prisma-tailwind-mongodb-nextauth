"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
type Props = {
  currentUser?: SafeUser | null;
};

export default function UserMenu({ currentUser }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const toogleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    //open Rent Modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm 
        font-semibold  rounded-full py-3 px-4 hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toogleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row
        items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden
      right-0 top-12 text-sm bg-white
      "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              {!currentUser ? (
                <>
                  {" "}
                  <MenuItem label="Login" onClick={loginModal.onOpen} />
                  <MenuItem label="Sign-Up" onClick={registerModal.onOpen} />
                </>
              ) : (
                <>
                  <MenuItem
                    label="My trips"
                    onClick={() => {
                      router.push("/trips");
                    }}
                  />
                  <MenuItem
                    label="My favorites"
                    onClick={() => {
                      signOut();
                    }}
                  />
                  <MenuItem
                    label="My reservations"
                    onClick={() => {
                      signOut();
                    }}
                  />
                  <MenuItem
                    label="My properties"
                    onClick={() => {
                      signOut();
                    }}
                  />
                  <MenuItem label="Airbnb home" onClick={rentModal.onOpen} />
                  <MenuItem
                    label="Logout"
                    onClick={() => {
                      signOut();
                    }}
                  />
                </>
              )}
            </>
          </div>
        </div>
      ) : null}
    </div>
  );
}
