"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInFormData, signInSchema } from "@/lib/validation/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { signIn } from "@/helpers/api";

const SignIn = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      const signInResponse = await signIn(data);

      if (signInResponse.statusCode === 200) {
        const userData = {
          _id: signInResponse?.data?._id,
          email: signInResponse?.data?.email,
        };
        localStorage.setItem("token", signInResponse?.data?.token);
        localStorage.setItem("userData", JSON.stringify(userData));
        toast({
          title: signInResponse.message,
          variant: "success",
        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast({
          title: signInResponse.message,
          variant: "destructive",
        });
      }
      reset();
    } catch (err: any) {
      console.log(err);
      return toast({
        title: err.message,
        variant: "destructive",
      });
    }
  };

  const isFormError = Object.entries(errors).length === 0;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2 mt-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Sign In button */}
        <div className="mt-4">
          <Button
            className="w-full"
            type="submit"
            disabled={!isFormError || isSubmitting || !isDirty}
          >
            {isSubmitting ? "Loading..." : "Sign in"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
