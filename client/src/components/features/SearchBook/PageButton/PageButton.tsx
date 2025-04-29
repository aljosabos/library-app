import { PaginationItem, PaginationLink } from "@components/ui/pagination";

interface IPageButtonProps {
  page: number;
  isActive: boolean;
  onClick: () => void;
}

export const PageButton = ({ page, isActive, onClick }: IPageButtonProps) => {
  return (
    <PaginationItem key={page}>
      <PaginationLink
        href="#"
        isActive={isActive}
        className="text-inherit no-underline"
        onClick={onClick}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );
};
