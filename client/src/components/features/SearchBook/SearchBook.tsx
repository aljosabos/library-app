"use client";

import { useForm } from "react-hook-form";

import { Typography } from "@components/Typography/Typography";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

export const SearchBook = () => {
  const form = useForm();

  return (
    <div>
      <Typography className="bg-red-400" variant="h1">
        Search book
      </Typography>
      <Typography variant="h3">Search book</Typography>

      <Typography variant="small">Search book</Typography>

      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                c This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};
