import { ClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";

export const getClasses = (...classes: (string | undefined)[]) => {
  const appliedClasses = classes.filter(Boolean);
  return cn(...appliedClasses);
};

export const getClass = (
  classes: Partial<ClassNames> | undefined,
  className: keyof ClassNames,
) => classes?.[className];
