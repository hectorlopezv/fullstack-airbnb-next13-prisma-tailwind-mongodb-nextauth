"use client";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerModalValidator } from "@/app/libs/validators/registerModalValidator";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import PasswordRevealer from "../input/PassWordRevelaer";

import Button from "../Button";
import { loginModalValidatorType } from "@/app/libs/validators/loginModalValidator";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";
type Props = {};

export default function LoginModal({}: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<loginModalValidatorType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(registerModalValidator),
  });
  const onSubmit: SubmitHandler<loginModalValidatorType> = async (data) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", { ...data, redirect: false });
      if (res?.ok) {
        toast.success("Logged in successfully");
        router.refresh();
        loginModal.onClose();
      }
      if (res?.error) {
        toast.error(res?.error);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const toogle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
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
    </div>
  );
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
          <div>First time using airbnb?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toogle}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      title="Login"
      actionLabel="Continue"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
