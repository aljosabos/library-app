import { type VariantProps, cva } from "class-variance-authority";

export type TypographyVariantOptions =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "small";

export const TypographyVariants = cva("", {
  variants: {
    variant: {
      h1: ["text-2xl", "leading-tight", "font-bold"],
      h2: ["text-xl", "leading-snug", "font-semibold"],
      h3: ["text-lg", "leading-normal", "font-medium"],
      h4: ["font-semibold text-[0.875rem]  sm:text-[0.938rem] lg:text-[1rem]"],
      p: ["text-base", "leading-relaxed", "font-normal"],
      small: ["text-sm", "font-light"],
    },
  },

  defaultVariants: {
    variant: "p",
  },
});

export type TypographyVariantProps = VariantProps<typeof TypographyVariants> & {
  variant?: TypographyVariantOptions;
};
