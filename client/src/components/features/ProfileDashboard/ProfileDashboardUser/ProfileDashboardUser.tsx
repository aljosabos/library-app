"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { IUser } from "@api/user/get";
import { updateUser } from "@api/user/update";
import { Typography } from "@components/Typography/Typography";
import { Button } from "@components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@components/ui/select";

import { BooksTable } from "../ProfileDashboardAdmin/BooksTable/BooksTable";

import { profileDashboardUserSchema } from "./ProfileDashboardUser.schema";

type FormValues = {
  email: string;
  isAdmin: boolean;
  password?: string;
  oldPassword?: string;
};

interface IProfileDashboardUserProps {
  user?: IUser;
}

export const ProfileDashboardUser = ({ user }: IProfileDashboardUserProps) => {
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof profileDashboardUserSchema>>({
    resolver: zodResolver(profileDashboardUserSchema),
  });

  const handleFormSubmit: SubmitHandler<FormValues> = async (values) => {
    if (!user) return;
    startTransition(async () => {
      const response = await updateUser(values, user._id);

      form.setValue("password", "");
      form.setValue("oldPassword", "");

      if (response?.error) {
        setError(response?.error);
      } else {
        setError("");
      }
    });
  };

  useEffect(() => {
    if (!user) return;

    form.reset({
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }, [user, form]);

  return (
    <div className="flex gap-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className="flex w-[500px] flex-col gap-6 rounded-md border p-6">
            <Typography variant="h1">{user?.email}</Typography>
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
              name="isAdmin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    value={Boolean(field.value) ? "admin" : "user"}
                    disabled
                  >
                    <FormControl>
                      <SelectTrigger className="min-w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 rounded-md border p-4">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="****"
                        {...field}
                        autoComplete="off"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage>{error}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="****"
                        {...field}
                        autoComplete="off"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Typography variant="small" className="rounded-md bg-blue-50">
                * To change password you must provide old password
              </Typography>
            </div>
            <Button>Update</Button>
          </div>
        </form>
      </Form>
      <div className="max-h-[640px] overflow-auto rounded-md border p-4">
        <BooksTable books={user?.books} title="Borrowed books" hideId />
      </div>
    </div>
  );
};
