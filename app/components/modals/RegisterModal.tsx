"use client";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerModalValidator,
  registerModalValidatorType,
} from "@/app/validators/registerModalValidator";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import PasswordRevealer from "../input/PassWordRevelaer";
type Props = {};

export default function RegisterModal({}: Props) {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<registerModalValidatorType>({
    defaultValues: {
      name: "",
      email: "",
      confirmPassword: "",
      password: "",
    },
    resolver: zodResolver(registerModalValidator),
  });
  const onSubmit: SubmitHandler<registerModalValidatorType> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/auth/register", data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an Account!" />
      <Input
        id="email"
        label="Email"
        erros={errors}
        required
        register={register}
        type="text"
      />
      <Input
        id="name"
        label="Name"
        erros={errors}
        required
        register={register}
        type="text"
      />
      <PasswordRevealer
        id="password"
        label="Password"
        erros={errors}
        required
        register={register}
        type="password"
      />
      <Input
        type="password"
        id="confirmPassword"
        label="Confirmation Password"
        erros={errors}
        required
        register={register}
      />
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      title="Register"
      actionLabel="Continue"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}
