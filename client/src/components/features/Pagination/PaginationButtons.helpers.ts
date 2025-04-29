export const handleAddElipsis = (
  pages: (number | "...")[],
  condition: boolean,
) => {
  if (condition) {
    pages.push("...");
  }
};
