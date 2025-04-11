"use client";

import { CircleX, Eye } from "lucide-react";

import { IBook } from "@api/books/getAll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";

interface IBooksTableProps {
  books: IBook[] | undefined;
}

export const BooksTable = ({ books }: IBooksTableProps) => {
  return (
    <Table className="my-4 w-full overflow-x-auto">
      <TableHeader className="sticky top-0">
        <TableRow className="rounded-md bg-gray-200">
          <TableHead className="px-4 font-bold">Details</TableHead>
          <TableHead className="max-w-[70px] font-bold">Id</TableHead>
          <TableHead className="min-w-[180px] font-bold">Title</TableHead>
          <TableHead className="min-w-[100px] font-bold">Author</TableHead>
          <TableHead className="min-w-[100px] font-bold">Genre</TableHead>
          <TableHead className="min-w-[100px] font-bold">Published</TableHead>
          <TableHead className="min-w-[100px] font-bold">ISBN</TableHead>
          <TableHead className="min-w-[500px] font-bold">Description</TableHead>
          <TableHead className="px-4 font-bold">Delete</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {books?.map((book) => (
          <TableRow key={book._id}>
            <TableCell>
              <div className="flex h-full cursor-pointer items-center justify-center p-2">
                <Eye width={20} />
              </div>
            </TableCell>
            <TableCell>{book._id}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{book.publishedYear}</TableCell>
            <TableCell>{book.isbn}</TableCell>
            <TableCell>{book.description}</TableCell>
            <TableCell>
              <div className="flex h-full cursor-pointer items-center justify-center p-2">
                <CircleX width={18} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
