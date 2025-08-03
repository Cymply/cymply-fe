// src/entities/signup/ui/SelectSex.tsx
"use client";

import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import useSelectSex from "@/entities/signup/hooks/useSelectSex";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radioGroup";

export default function SelectSex() {
  const { selectedGender, handleGenderSelect } = useSelectSex();

  return (
    <div className="space-y-11">
      {/* 성별 제목 */}
      <Label className="text-black-400 text-5xl font-bold font-gangwonEduAll leading-[3rem]">
        성별을 알려주세요
      </Label>

      {/* Radio Group으로 성별 선택 - 가로 배치 */}
      <RadioGroup
        value={selectedGender || undefined}
        onValueChange={(value) => handleGenderSelect(value as "M" | "F")}
        className="flex flex-row justify-between gap-[1.125rem]"
      >
        {/* 남성 선택 */}
        <div className="relative">
          <RadioGroupItem value="M" id="male" className="sr-only" />
          <Label
            htmlFor="male"
            className={cn(
              "flex items-center justify-center w-[20.625rem] h-[7.5rem] rounded-[0.625rem] cursor-pointer transition-all duration-200 ease-in-out",
              "text-[2rem] font-semibold leading-9",
              selectedGender === "M"
                ? "!bg-primary-light border-[0.1875rem] !border-primary text-primary font-bold"
                : "bg-gray-400 text-gray-900 hover:bg-stone-100"
            )}
          >
            남성
          </Label>
        </div>

        {/* 여성 선택 */}
        <div className="relative">
          <RadioGroupItem value="F" id="female" className="sr-only" />
          <Label
            htmlFor="female"
            className={cn(
              "flex items-center justify-center w-[20.625rem] h-[7.5rem] rounded-[0.625rem] cursor-pointer transition-all duration-200 ease-in-out",
              "text-[2rem] font-semibold leading-9",
              selectedGender === "F"
                ? "!bg-primary-light border-[0.1875rem] !border-primary text-primary font-bold"
                : "bg-gray-400 text-gray-900 hover:bg-stone-100"
            )}
          >
            여성
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
