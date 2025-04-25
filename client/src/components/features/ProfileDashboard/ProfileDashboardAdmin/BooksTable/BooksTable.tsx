"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CircleX, Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import { IBook } from "@api/books/getAll";
import { Typography } from "@components/Typography/Typography";
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
  className?: string;
  hideId?: boolean;
  hideDetails?: boolean;
  title?: string;
  onDelete?: (id: string) => void;
}

export const BooksTable = ({
  books,
  className,
  hideId,
  hideDetails,
  title,
  onDelete,
}: IBooksTableProps) => {
  return (
    <div>
      <Typography variant="h1">{title}</Typography>
      <ScrollArea className={cn("my-4 max-w-full overflow-auto", className)}>
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow className="rounded-md bg-gray-200">
              {!hideDetails && (
                <TableHead className="px-4 font-bold">Details</TableHead>
              )}
              {!hideId && (
                <TableHead className="max-w-[70px] font-bold">Id</TableHead>
              )}
              <TableHead className="min-w-[180px] font-bold">Title</TableHead>
              <TableHead className="min-w-[100px] font-bold">Author</TableHead>
              <TableHead className="min-w-[100px] font-bold">Genre</TableHead>
              <TableHead className="min-w-[100px] font-bold">
                Published
              </TableHead>
              <TableHead className="min-w-[100px] font-bold">ISBN</TableHead>
              <TableHead className="min-w-[500px] font-bold">
                Description
              </TableHead>
              {renderDeleteHeading(onDelete)}
            </TableRow>
          </TableHeader>

          <TableBody>
            {books?.length ? (
              books.map((book) => (
                <TableRow key={book._id}>
                  {!hideDetails && (
                    <TableCell>
                      <div className="flex h-full cursor-pointer items-center justify-center p-2">
                        <Eye width={20} />
                      </div>
                    </TableCell>
                  )}
                  {!hideId && <TableCell>{book._id}</TableCell>}
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.publishedYear}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.description}</TableCell>
                  {onDelete && (
                    <TableCell>
                      <div className="flex h-full cursor-pointer items-center justify-center p-2">
                        <CircleX
                          width={18}
                          onClick={() => onDelete(book._id)}
                        />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="border-b border-t py-8 pl-64">
                  <Typography variant="h3" className="w-full">
                    This user has no books
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

const renderDeleteHeading = (deleteCallback?: (id: string) => void) =>
  deleteCallback && <TableHead className="px-4 font-bold">Delete</TableHead>;
