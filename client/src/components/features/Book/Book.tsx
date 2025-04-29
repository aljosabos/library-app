import { IBook } from "@/api/books/getAll";
import { Typography } from "@components/Typography/Typography";

export const Book = ({
  title,
  author,
  genre,
  publishedYear,
  isbn,
  description,
}: IBook) => {
  return (
    <div className="my-4 rounded-xl border border-gray-200 p-6">
      <div className="flex items-baseline">
        <Typography variant="h3" className="font-bold">
          {title}&nbsp;
        </Typography>
        <Typography variant="h4" className="font-normal">
          by {author}
        </Typography>
      </div>
      <Typography>Genre: {genre}</Typography>
      <Typography className="my-4">{description}</Typography>
      <Typography>Year published: {publishedYear}</Typography>
      <Typography variant="small">isbn: {isbn}</Typography>
    </div>
  );
};
