"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { loginUser } from "@/api/auth/login";
import { revalidate } from "@/app/actions/route/revalidate";
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

import { loginSchema, TLoginData } from "./AuthForm.schema";

export const AuthForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<TLoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TLoginData> = async (data) => {
    const response = await loginUser(data);

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

            <Button className="mt-4">Login</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
