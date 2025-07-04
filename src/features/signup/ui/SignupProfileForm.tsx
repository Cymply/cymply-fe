
// src/features/signup/ui/SignupProfileForm.tsx
'use client'

import SelectSex from "@/entities/signup/ui/SelectSex"
import SelectBirthday from "@/entities/signup/ui/SelectBirthday"

export default function SignupProfileForm() {
  return (
    <div className="space-y-12">
      <SelectSex />
      <SelectBirthday />
    </div>
  )
}