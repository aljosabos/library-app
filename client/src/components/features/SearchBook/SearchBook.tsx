"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { getAllBooks, IGetAllBooksResponse } from "@/api/books/getAll";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { Book } from "@features/Book/Book";

type ISearchBookParams = {
  search?: string;
  filter: "title" | "author";
};

export const SearchBook = () => {
  const [booksData, setBooksData] = useState<IGetAllBooksResponse>();
  const form = useForm<ISearchBookParams>({
    defaultValues: {
      filter: "title",
      search: "",
    },
  });

  const handleFormSubmit = async (fields: ISearchBookParams) => {
    const data = await getAllBooks(fields);
    if (data) setBooksData(data);
  };

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

      <div className="mt-6 h-auto">
        {booksData?.books.map((book, idx) => (
          <Book {...book} key={book._id} index={idx + 1} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="text-inherit no-underline"
            />
          </PaginationItem>

          {Array.from(
            { length: booksData?.numOfPages || 0 },
            (_, index) => index + 1,
          ).map((page, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href=""
                isActive={page === booksData?.currentPage}
                className="text-inherit no-underline"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" className="text-inherit no-underline" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
