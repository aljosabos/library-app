import { faker } from "@faker-js/faker";

import { bookGenres } from "../src/constants/bookConstants";

/**
 * Generates a list of mock books with random attributes.
 * @param count number of generated book items
 * @returns book items
 */
export const populateBooks = (count = 100) => {
  return Array.from({ length: count }, () => {
    const title = faker.book.title();
    const author = faker.person.firstName() + " " + faker.person.lastName();
    const genre = faker.helpers.arrayElement(bookGenres);

    return {
      id: faker.string.uuid(),
      title: title,
      author: author,
      genre: genre,
      publishedYear: faker.number.int({ min: 1800, max: 2025 }),
      isbn: faker.commerce.isbn(),
      description: generateBookDescription(title, author, genre),
    };
  });
};

/**
 * Generates a human-readable book description instead of a lorem ipsum paragraph.
 * @param title string
 * @param author string
 * @param genre one of the genres found in bookGenres array
 * @returns book description
 */
const generateBookDescription = (
  title: string,
  author: string,
  genre: (typeof bookGenres)[number]
) => {
  const plot = faker.lorem.sentence();
  const setting =
    faker.location.city() + ", " + faker.date.past().getFullYear();

  const theme = faker.helpers.arrayElement([
    "a journey of self-discovery",
    "a tale of love and betrayal",
    "an exploration of human nature",
    "a gripping adventure",
    "a profound meditation on life",
    "a chilling mystery",
    "a heartwarming story",
    "a groundbreaking work",
  ]);

  const praise = faker.helpers.arrayElement([
    "critically acclaimed",
    "award-winning",
    "bestselling",
    "highly praised",
    "widely celebrated",
    "groundbreaking",
  ]);

  return (
    `${title} by ${author} is ${praise} ${genre} novel that presents ${theme}. ` +
    `Set in ${setting}, this book ${plot}. ` +
    `A ${faker.helpers.arrayElement(["must-read", "compelling", "unforgettable"])} ` +
    `work that will ${faker.helpers.arrayElement([
      "stay with you long after the last page",
      "change the way you see the world",
      "keep you on the edge of your seat",
      "touch your heart",
    ])}.`
  );
};
