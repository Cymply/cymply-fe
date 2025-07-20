// src/features/letter/ui/LetterFormTextarea.tsx

import React from "react";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";

type LetterFormTextareaProps = {
  label?: string;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const LetterFormTextarea = React.forwardRef<HTMLTextAreaElement, LetterFormTextareaProps>(
  ({ label, error, placeholder, maxLength, showCount = false, className, ...props }, ref) => {
    const value = props.value?.toString() || "";

    const isOverLimit = maxLength !== undefined && value.length > maxLength;

    return (
      <div className="flex flex-col gap-6">
        {label && <label className="text-[2rem] text-black-300">{label}</label>}

        <Textarea
          {...props}
          ref={ref}
          maxLength={maxLength}
          placeholder={placeholder}
          className={clsx(
            "w-full border-b transition-colors resize-none font-gangwonEduAll font-bold",
            isOverLimit || error
              ? "border-states-red focus-visible:ring-red-500"
              : "border-gray-800 focus-visible:ring-yellow-400",
            className
          )}
        />

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

LetterFormTextarea.displayName = "LetterFormTextarea";
