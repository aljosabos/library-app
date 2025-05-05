# PaginationButtons Component

This component renders a paginated navigation interface. It includes logic for handling page numbers, ellipses, and navigation controls using Shadcn's pagination components and a custom `PageButton`.

## Props

| Prop Name         | Type                     | Required | Default | Description                                                       |
| ----------------- | ------------------------ | -------- | ------- | ----------------------------------------------------------------- |
| `numOfPages`      | `number`                 | ✅       | —       | Total number of pages.                                            |
| `currentPage`     | `number`                 | ✅       | —       | Currently selected page.                                          |
| `maxVisiblePages` | `number`                 | ❌       | `5`     | Maximum number of pages to visibly show before ellipses are used. |
| `onPageClick`     | `(page: number) => void` | ✅       | —       | Callback when a specific page is clicked.                         |
| `onNext`          | `() => void`             | ✅       | —       | Callback when the "next" button is clicked.                       |
| `onPrevious`      | `() => void`             | ✅       | —       | Callback when the "previous" button is clicked.                   |

## Pagination Logic & Comments

```tsx
if (numOfPages <= maxVisiblePages) {
  // Show all pages if total pages are less than maxVisiblePages
  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }
} else {
  // first page is always shown
  pages.push(1);

  // if the currentPage is 3, we dont show elipsis, instead we show 1,2,3. But if its greather, we add elipsis
  handleAddElipsis(pages, currentPage > 3);

  /*
  This is the page after 1 but before the current selected page
  we start from 2 because we dont want to show page 1 twice

     Math.max is alternative to this:
     let startPage = currentPage - 1;
     if (startPage < 2) {
       startPage = 2;
     } */
  const pageBeforeCurrent = Math.max(2, currentPage - 1);

  /* This is the page after the current selected page but before the last page

   Math.min is alternative to this:
     let pageAfterCurrent;
     if (currentPage + 1 > numOfPages - 1) {
       pageAfterCurrent = numOfPages - 1;
     } else  {
       pageAfterCurrent = currentPage + 1;
     }
     numOfPages (lastPage) is always present. And one page after the current
  */
  const pageAfterCurrent = Math.min(numOfPages - 1, currentPage + 1);

  // Add the pages visible around the current page (including the current page itself)
  for (let i = pageBeforeCurrent; i <= pageAfterCurrent; i++) {
    pages.push(i);
  }

  // add elipsis before last page
  handleAddElipsis(pages, currentPage < numOfPages - 2);

  // add last page
  pages.push(numOfPages);
}
```

## Rendering

- Uses `Pagination`, `PaginationItem`, `PaginationPrevious`, `PaginationNext`, `PaginationContent` from Shadcn UI.
- Page numbers are rendered as `PageButton`s.
- Ellipses are conditionally added using `PaginationEllipsis` based on logic above.

## Ellipsis Utility

`handleAddElipsis(pages, shouldAdd)` is a helper function that conditionally appends `"..."` to the `pages` array.

## Example

```tsx
<PaginationButtons
  numOfPages={10}
  currentPage={4}
  onPageClick={(page) => setPage(page)}
  onNext={() => setPage(prev => prev + 1)}
  onPrevious={() => setPage(prev => prev - 1)}
/>
```

## Notes

- Keeps the first and last page always visible when `numOfPages` > `maxVisiblePages`.
- Displays up to 3 central pages: `current - 1`, `current`, `current + 1`.
- Uses ellipses to indicate skipped pages.
