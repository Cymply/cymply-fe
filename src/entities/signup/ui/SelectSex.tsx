// src/entities/signup/ui/SelectSex.tsx
'use client'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import useSelectSex from "@/entities/signup/hooks/useSelectSex";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radioGroup";

export default function SelectSex() {
  const {
    selectedGender,
    handleGenderSelect,
  } = useSelectSex();
  console.log("selectGender", selectedGender)
  return (
    <div className="space-y-4">
      {/* 성별 제목 */}
      <Label className="text-black text-3xl font-bold font-['Pretendard'] leading-9">
        성별
      </Label>
      
      {/* Radio Group으로 성별 선택 */}
      <RadioGroup
        value={selectedGender || undefined}
        onValueChange={(value) => handleGenderSelect(value as 'M' | 'F')}
        className="flex-col flex gap-6"
      >
        {/* 남성 선택 */}
        <div className="relative">
          <RadioGroupItem
            value="M"
            id="male"
            className="sr-only"
          />
          <Label
            htmlFor="male"
            className={cn(
              "flex items-center justify-center w-80 h-28 rounded-[10px] cursor-pointer transition-all duration-200 ease-in-out",
              "text-3xl font-semibold font-['Pretendard'] leading-9",
              selectedGender === 'M'
                ? 'bg-blue-100 text-blue-600 border border-blue-600 font-bold'
                : 'bg-stone-50 text-zinc-400 hover:bg-stone-100'
            )}
          >
            남성
          </Label>
        </div>
        
        {/* 여성 선택 */}
        <div className="relative">
          <RadioGroupItem
            value="F"
            id="female"
            className="sr-only"
          />
          <Label
            htmlFor="female"
            className={cn(
              "flex items-center justify-center w-80 h-28 rounded-[10px] cursor-pointer transition-all duration-200 ease-in-out",
              "text-3xl font-semibold font-['Pretendard'] leading-9",
              selectedGender === 'F'
                ? '!bg-pink-100 text-pink-600 border border-pink-600 font-bold'
                : '!bg-stone-50 text-zinc-400 hover:bg-stone-100'
            )}
          >
            여성
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}