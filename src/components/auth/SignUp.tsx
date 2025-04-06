"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { SignUpFormData, signUpSchema } from "@/lib/validation/signUp";
import { Label } from "@radix-ui/react-label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { signUp } from "@/helpers/api";

const SignUp = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const signUpResponse = await signUp(data);

      if (signUpResponse.statusCode === 201) {
        toast({
          title: signUpResponse.message,
          variant: "success",
        });
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      } else {
        toast({
          title: signUpResponse.message,
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
        {/* Name */}
        <div className="grid gap-2">
          <Label htmlFor="fullName">Name</Label>
          <Input
            {...register("fullName")}
            id="fullName"
            type="text"
            placeholder="Your name"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

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
        <div className="grid gap-2">
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

        {/* Sign Up button */}
        <div className="mt-4">
          <Button
            className="w-full"
            type="submit"
            disabled={!isFormError || isSubmitting || !isDirty}
          >
            {isSubmitting ? "Loading..." : "Create account"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
