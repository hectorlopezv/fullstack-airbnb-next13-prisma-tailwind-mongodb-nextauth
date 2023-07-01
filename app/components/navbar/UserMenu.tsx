"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
type Props = {};

export default function UserMenu({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const toogleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
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
            <Avatar />
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
              <MenuItem label="Login" onClick={() => {}} />
              <MenuItem label="Sign-Up" onClick={registerModal.onOpen} />
            </>
          </div>
        </div>
      ) : null}
    </div>
  );
}
