"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { revalidate } from "@actions/route/revalidate";
import { registerUser } from "@api/auth/register";
import { Typography } from "@components/Typography/Typography";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

import { registerSchema, TRegisterData } from "./RegisterUser.schema";

export const RegisterUser = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<TRegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TRegisterData> = async (data) => {
    const response = await registerUser(data);

    if (response.success) {
      revalidate("/");
      router.push("/");
    }

    if (response?.error) setError(response?.error);
  };

  return (
    <div className="mt-16">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className="mx-auto flex w-[400px] flex-col gap-6">
            <Typography variant="h1">Register User</Typography>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      autoComplete="off"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>{error}</FormMessage>
                </FormItem>
              )}
            />
            <Typography variant="small">
              <Link href="/login" className="text-inherit no-underline">
                Already have account? Click to login
              </Link>
            </Typography>

            <Button>Register</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
