// src/features/signup/ui/NicknameForm.tsx
'use client'

import SetNickname from "@/entities/signup/ui/SetNickname"
import {Suspense} from "react";

export default function NicknameForm() {
  return (
    <div className="space-y-6">
        <SetNickname />
    </div>
  )
}
