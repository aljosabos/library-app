"use client";

import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export const SearchBook = () => {
  const form = useForm({
    defaultValues: {
      filter: "title",
      search: "",
    },
  });

  const handleFormSubmit = () => console.log("submit");

  return (
    <div>
      <Typography variant="h1" className="mb-2">
        Search book
      </Typography>

      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className="flex items-end gap-4">
            <FormField
              control={form.control}
              name="filter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search by</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="min-w-[150px]">
                        <SelectValue placeholder="Search book by" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Search" {...field} autoComplete="off" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button>Search</Button>
          </div>
        </form>
      </Form>

      <div className="mt-6 h-auto border border-gray-100"></div>
    </div>
  );
};
