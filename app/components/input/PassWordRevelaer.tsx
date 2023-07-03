"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input from "./Input";
type Props = {
  id: any;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: any;
  erros: any;
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
