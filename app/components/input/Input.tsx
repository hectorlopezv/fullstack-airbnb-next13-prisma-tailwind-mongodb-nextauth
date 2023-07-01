"use client";
import { BiDollar } from "react-icons/bi";
import { registerModalValidatorType } from "@/app/validators/registerModalValidator";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";

type Props = {
  id: keyof registerModalValidatorType;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<registerModalValidatorType>;
  erros: FieldErrors<registerModalValidatorType>;
  children?: ReactNode;
};

export default function Input({
  erros,
  id,
  label,
  register,
  disabled,
  formatPrice,
  required,
  children,
  type = "text",
}: Props) {
  return (
    <div className="w-full relative">
      {formatPrice ? (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-4 left-2"
        />
      ) : null}
      <input
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none
      transition disabled:opacity-70 disabled:cursor-not-allowed ${
        formatPrice ? "pl-9" : "pl-4"
      }
      ${erros[id] ? "border-rose-500" : "border-neutral-300"}
      ${erros[id] ? "focus:border-rose-500" : "focus:border-neutral-300"}
      `}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
      />
      {children ? (
        <div
          className={`absolute text-md duration-150 transform top-6 z-10 origin-[0]
       right-4
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
      peer-focus:scale-75 peer-focus:-translate-y-4`}
        >
          {children}
        </div>
      ) : null}

      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
      ${formatPrice ? "left-9" : "left-4"}
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
      peer-focus:scale-75 peer-focus:-translate-y-4
      ${erros[id] ? "text-rose-500" : "text-zinc-400"}
      `}
      >
        {label}
      </label>
      {erros[id] && (
        <span className="text-red-800 block mt-2">{erros[id]?.message}</span>
      )}
    </div>
  );
}
