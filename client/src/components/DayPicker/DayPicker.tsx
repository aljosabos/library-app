"use client";

import { useState } from "react";
import { DayPicker, UI, getDefaultClassNames } from "react-day-picker";
import { ClassNames } from "react-day-picker";
import "react-day-picker/style.css";

import { getClass, getClasses } from "./DayPicker.helpers";
import "./DayPicker.scss";

interface IDayPickerProps {
  classes?: Partial<ClassNames>;
}

export const DatePicker = ({ classes }: IDayPickerProps) => {
  const [selected] = useState<Date>();

  const defaultClasses = getDefaultClassNames();

  return (
    <DayPicker
      animate
      mode="multiple"
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
      classNames={{
        day: getClasses(
          defaultClasses.day,
          getClass(classes, UI.Day),
          "border-0",
        ),
        day_button: getClasses(
          defaultClasses.day_button,
          getClass(classes, UI.DayButton),
          "!rounded-none",
        ),
        selected: getClasses(defaultClasses.selected, classes?.selected),
        chevron: getClasses(defaultClasses.chevron, "!fill-black"),
        weekday: getClasses(defaultClasses.weekday, "!text-base"),
        month_caption: getClasses(defaultClasses.month_caption, "!px-4"),
      }}
    />
  );
};
