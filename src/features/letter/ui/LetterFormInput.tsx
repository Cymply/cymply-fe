// src/features/letter/ui/LetterFormInput.tsx

"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Input } from "@/components/ui/Input";
import Image from "next/image";

type LetterFormInputProps = {
  label?: string;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const LetterFormInput = React.forwardRef<HTMLInputElement, LetterFormInputProps>(
  ({ label, error, placeholder, maxLength, showCount = false, className, ...props }, ref) => {
    const [value, setValue] = useState(props.value?.toString() || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    const handleClear = () => {
      setValue("");
    };

    const isOverLimit = maxLength !== undefined && value.length > maxLength;

    return (
      <div className="flex flex-col gap-6">
        {label && <label className="text-[2rem] t ext-black-300">{label}</label>}

        <div className="relative w-full">
          <Input
            {...props}
            ref={ref}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={handleChange}
            value={value}
            className={clsx(
              "w-full border-b border-gray-800 pt-[2.625rem] pb-[2.625rem] shadow-none bg-transparent focus:outline-none font-gangwonEduAll font-bold",
              isOverLimit ? "border-states-red" : "border-gray-800 ",
              className
            )}
          />
          {value && (
            <button
              onClick={handleClear}
              aria-label="초기화"
              className="absolute w-12 h-12 right-9 top-1/2 -translate-y-1/2"
            >
              <Image src="/icons/ico-close.svg" alt="icon-close" fill />
            </button>
          )}
        </div>

        {showCount && (
          <div className="flex">
            <p className={clsx("text-[2rem]", isOverLimit ? "text-states-red" : "text-gray-900")}>
              ({value.length}
              {maxLength ? `/${maxLength}` : ""})
            </p>
            {error && <p className="text-[2rem] text-states-red">{`, ${error}`}</p>}
          </div>
        )}
      </div>
    );
  }
);

LetterFormInput.displayName = "LetterFormInput";
