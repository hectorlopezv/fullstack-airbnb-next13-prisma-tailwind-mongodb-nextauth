"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

export default function Logo({}: Props) {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      alt="logo"
      height={100}
      width={100}
      src={"/images/logo.png"}
      className="hidden md:block cursor-pointer"
    />
  );
}
