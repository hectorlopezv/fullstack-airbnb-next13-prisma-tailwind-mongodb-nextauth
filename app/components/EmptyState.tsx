"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

export default function EmptyState({
  showReset,
  subtitle = "Try a different filter, for better results",
  title = "No exact matches",
}: Props) {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset ? (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        ) : null}
      </div>
    </div>
  );
}
