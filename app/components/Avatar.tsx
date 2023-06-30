"use client";

import Image from "next/image";

type Props = {};

export default function Avatar({}: Props) {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="avatar"
      src={"/images/placeholder.jpg"}
    />
  );
}
