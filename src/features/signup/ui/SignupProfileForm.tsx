// src/features/signup/ui/SignupProfileForm.tsx
'use client'

import SelectSex from "@/entities/signup/ui/SelectSex"
import SelectBirthday from "@/entities/signup/ui/SelectAgeGroup";

export default function SignupProfileForm() {
  return (
    <div className="space-y-16">
      <SelectSex />
      <SelectBirthday />
    </div>
  )
}