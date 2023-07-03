"use client";
import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";
export type ContrySelectValue = {
  flag: string;
  label: string;
  region: string;
  latlng: number[];
  value: string;
};

type Props = {
  value?: ContrySelectValue;
  onChange: (value: ContrySelectValue) => void;
};

export default function CountrySelect({ onChange, value }: Props) {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as ContrySelectValue)}
        formatOptionLabel={(option: any) => {
          return (
            <div className="flex flex-row items-center gap-3">
              <div>{option.flag}</div>
              <div>
                {option.label},{" "}
                <span className="text-neutral-800 ml-1">{option.region}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
}
