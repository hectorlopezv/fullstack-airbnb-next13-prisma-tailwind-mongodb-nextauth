"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input from "./Input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { registerModalValidatorType } from "@/app/validators/registerModalValidator";
type Props = {
  id: keyof registerModalValidatorType;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<registerModalValidatorType>;
  erros: FieldErrors<registerModalValidatorType>;
};
const PasswordRevealer = ({
  erros,
  register,
  id,
  label,
  disabled,
  required,
  type,
}: Props) => {
  const [shown, setShown] = useState(false);

  return (
    <>
      <Input
        id={id}
        label={label}
        erros={erros}
        required={required}
        register={register}
        type={shown ? "text" : type}
        disabled={disabled}
      >
        {shown ? (
          <FiEye onClick={() => setShown(!shown)} />
        ) : (
          <FiEyeOff onClick={() => setShown(!shown)} />
        )}
      </Input>
    </>
  );
};

export default PasswordRevealer;
