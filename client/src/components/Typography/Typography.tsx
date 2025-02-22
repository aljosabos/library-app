import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  TypographyVariantProps,
  TypographyVariants,
} from "./Typography.constants";

export interface TypographyProps extends TypographyVariantProps {
  tag?: TypographyVariantProps["variant"];
  className?: string;
  as?: React.ElementType;
  children: ReactNode;
}

export const Typography = ({
  variant = "p",
  as,
  className,
  children,
}: TypographyProps) => {
  const Component = as || variant;

  return (
    <Component className={cn(TypographyVariants({ variant, className }))}>
      {children}
    </Component>
  );
};
