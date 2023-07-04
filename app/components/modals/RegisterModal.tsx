"use client";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerModalValidator,
  registerModalValidatorType,
} from "@/app/libs/validators/registerModalValidator";

import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import PasswordRevealer from "../input/PassWordRevelaer";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
type Props = {};

export default function RegisterModal({}: Props) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
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
      await axios.post("/api/register", data);
      toast.success("Account created successfully");
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later");
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
  const toogle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {
          signIn("github");
        }}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className=" justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toogle}
          >
            Log in
          </div>
        </div>
      </div>
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
      footer={footerContent}
    />
  );
}
