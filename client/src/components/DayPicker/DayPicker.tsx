"use client";

import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

import "./DayPicker.scss";

export const DatePicker = () => {
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
        day: "text-lg border-0",
        day_button: `${defaultClasses.day_button} !rounded-none`,
        selected: `${defaultClasses.selected}`,
        chevron: `${defaultClasses.chevron} !fill-black`,
        weekday: `${defaultClasses.weekday} !text-base`,
        month_caption: `${defaultClasses.month_caption} !px-4`,
      }}
    />
  );
};
