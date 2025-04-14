"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllBooksAction } from "@actions/bookActions/getAll";
import { IBook } from "@api/books/getAll";
import { getUser, IUser } from "@api/user/get";
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

import { BooksTable } from "../ProfileDashboardAdmin/BooksTable/BooksTable";

export const ProfileDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<IUser>();
  const [allBooks, setAllBooks] = useState<IBook[]>([]);
  const [userBooks, setUserBooks] = useState<IBook[]>([]);
  const [selectedBookID, setSelectedBookID] = useState<string>("");

  const form = useForm<IUser & { password: string }>({
    defaultValues: {
      email: "",
      password: "",
      isAdmin: false,
      books: [],
    },
  });

  // Fetch data
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const [userData, allBooksData] = await Promise.all([
        getUser(id),
        getAllBooksAction({ filter: "title", search: "" }),
      ]);

      if (allBooksData) {
        setAllBooks(allBooksData.books);
      }

      if (userData) {
        setUser(userData);

        form.reset({
          email: userData.email,
          isAdmin: userData.isAdmin,
          books: userData.books,
        });

        // admins do not have books, need for check
        if (userData.books) {
          setUserBooks(userData.books);
        }
      }
    };

    fetchData();
  }, [id, form]);

  const availableBooks = useMemo(() => {
    const books = allBooks?.filter(
      (b) => !userBooks.some((ub) => ub._id === b._id),
    );

    return books;
  }, [userBooks, allBooks]);

  const handleAddBook = (bookId?: string) => {
    if (!bookId) return;

    const book = allBooks.find((book) => book._id === bookId);
    if (book) {
      setUserBooks((current) => [...current, book]);
      setSelectedBookID("");
    }
  };

  const handleRemoveBook = (bookId?: string) => {
    if (!bookId) return;
    setUserBooks((current) => current.filter((book) => book._id !== bookId));
  };

  const handleFormSubmit = () => console.log("submit");

  return (
    <div className="flex gap-4">
      <div className="min-w-[600px] rounded-md border p-6">
        <Typography variant="h1" className="mb-4">
          {user?.email}
        </Typography>
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(handleFormSubmit)}
          >
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
                  <FormLabel>Change password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New password"
                      {...field}
                      autoComplete="off"
                    />
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
            <div className="flex flex-col gap-4 rounded-md border p-4">
              <Typography variant="h2">Add Book To User</Typography>

              <FormField
                control={form.control}
                name="books"
                render={() => (
                  <FormItem>
                    <FormLabel>Books</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        setSelectedBookID(value);
                      }}
                      value={selectedBookID}
                    >
                      <FormControl>
                        <SelectTrigger className="min-w-[150px]">
                          <SelectValue placeholder="Select book" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableBooks.map((book) => (
                          <SelectItem key={book._id} value={book._id}>
                            {book.title} by {book.author}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                className="w-min"
                onClick={() => handleAddBook(selectedBookID)}
              >
                Add book
              </Button>
            </div>

            <Button size="lg">Save User Changes</Button>
          </form>
        </Form>
      </div>
      <div className="max-h-[640px] overflow-auto rounded-md border p-4">
        <BooksTable
          books={userBooks}
          hideId
          hideDetails
          className="my-0"
          onDelete={handleRemoveBook}
        />
      </div>
    </div>
  );
};
