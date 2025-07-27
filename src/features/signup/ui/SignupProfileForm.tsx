// src/features/signup/ui/SignupProfileForm.tsx
"use client";

import SelectSex from "@/entities/signup/ui/SelectSex";
import SelectBirthday from "@/entities/signup/ui/SelectAgeGroup";
import { Suspense } from "react";

export default function SignupProfileForm() {
  return (
    <Suspense
      fallback={
        <div className="flex-col flex gap-[3.625rem]">
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      }
    >
      <div className="flex-col flex gap-[3.625rem]">
        <SelectSex />
        <SelectBirthday />
      </div>
    </Suspense>
  );
}
