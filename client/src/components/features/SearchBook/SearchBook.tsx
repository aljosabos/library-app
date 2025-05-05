"use client";

import { useCallback, useEffect, useState } from "react";

import { getAllBooks, IGetAllBooksResponse } from "@/api/books/getAll";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebonce";
import { Typography } from "@components/Typography/Typography";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Book } from "@features/Book/Book";
import { PaginationButtons } from "@features/Pagination/PaginationButtons";

import { initialBooksData } from "./SearchBook.constants";

type ISearchBookParams = {
  search?: string;
  searchBy: "title" | "author";
  page: number;
};

export const SearchBook = () => {
  const [{ books, currentPage, numOfPages }, setBooksData] =
    useState<IGetAllBooksResponse>(initialBooksData);

  const [filters, setFilters] = useState<ISearchBookParams>({
    search: "",
    searchBy: "title",
    page: 1,
  });

  const debouncedSearch = useDebounce(filters.search);

  useEffect(() => {
    const filtersWithDebouncedSearch = {
      search: debouncedSearch,
      searchBy: filters.searchBy,
      page: filters.page,
    };

    getAllBooks(filtersWithDebouncedSearch).then((data) => {
      if (data) {
        setBooksData(data);
      }
    });
  }, [debouncedSearch, filters.searchBy, filters.page]);

  const handleOnPageClick = (page: number) => {
    setFilters((currFilters) => ({ ...currFilters, page }));
  };

  const handleNextBtnClick = useCallback(() => {
    let nextPage = currentPage + 1;
    if (nextPage > numOfPages) nextPage = 1;
    setFilters((currFilters) => ({
      ...currFilters,
      page: nextPage,
    }));
  }, [currentPage, numOfPages]);

  const handlePreviousBtnClick = useCallback(() => {
    let prevPage = currentPage - 1;
    if (prevPage < 1) prevPage = numOfPages;

    setFilters((currFilters) => ({
      ...currFilters,
      page: prevPage,
    }));
  }, [currentPage, numOfPages]);

  return (
    <div>
      <Typography variant="h1" className="mb-2">
        Search book
      </Typography>

      <div className="flex items-end gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Search by</Label>
          <Select
            value={filters.searchBy}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                searchBy: value as "title" | "author",
              }))
            }
          >
            <SelectTrigger className="min-w-[150px]">
              <SelectValue placeholder="Search book by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Name</Label>
          <Input
            placeholder="Search"
            autoComplete="off"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="mt-6 h-auto">
        {books.map((book) => (
          <Book {...book} key={book._id} />
        ))}
      </div>

      <PaginationButtons
        currentPage={currentPage}
        numOfPages={numOfPages}
        onPageClick={handleOnPageClick}
        onNext={handleNextBtnClick}
        onPrevious={handlePreviousBtnClick}
      />
    </div>
  );
};
