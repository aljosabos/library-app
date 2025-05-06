import {
  PaginationItem,
  PaginationEllipsis,
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
import { PageButton } from "@features/SearchBook/PageButton/PageButton";

import { handleAddElipsis } from "./PaginationButtons.helpers";

interface IPaginationProps {
  numOfPages: number;
  currentPage: number;
  maxVisiblePages?: number;
  onPageClick: (page: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PaginationButtons = ({
  numOfPages,
  currentPage,
  maxVisiblePages = 5,
  onPageClick,
  onNext,
  onPrevious,
}: IPaginationProps) => {
  const pages: (number | "...")[] = [];

  if (numOfPages <= maxVisiblePages) {
    for (let i = 1; i <= numOfPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    handleAddElipsis(pages, currentPage > 3);

    const pageBeforeCurrent = Math.max(2, currentPage - 1);

    const pageAfterCurrent = Math.min(numOfPages - 1, currentPage + 1);

    for (let i = pageBeforeCurrent; i <= pageAfterCurrent; i++) {
      pages.push(i);
    }
    handleAddElipsis(pages, currentPage < numOfPages - 2);

    pages.push(numOfPages);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {/* previous btn*/}
          <PaginationPrevious
            href="#"
            className="text-inherit no-underline"
            onClick={onPrevious}
          />
        </PaginationItem>

        {/* visible page buttons*/}
        {pages.map((page, idx) =>
          typeof page === "number" ? (
            <PageButton
              key={page}
              page={page}
              isActive={page === currentPage}
              onClick={() => onPageClick(page)}
            />
          ) : (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ),
        )}

        {/* next btn*/}
        <PaginationItem>
          <PaginationNext
            href="#"
            className="text-inherit no-underline"
            onClick={onNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
