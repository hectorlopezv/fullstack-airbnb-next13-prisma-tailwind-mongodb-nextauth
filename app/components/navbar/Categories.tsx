"use client";
import Container from "./Container";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/app/libs/constants";

type Props = {};

export default function Categories({}: Props) {
  const params = useSearchParams();
  const pathName = usePathname();
  const category = params?.get("category");
  console.log("pathname", pathName);
  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
