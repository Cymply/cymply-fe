// src/entities/signup/ui/SelectAgeGroup.tsx
"use client";

import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radioGroup";
import useSelectAgeGroup from "@/entities/signup/hooks/useSelectAgeGroup";

const AGE_GROUPS = [
  { value: "AGE_UNDER_10", label: "9세 이하" },
  { value: "AGE_10_19", label: "10 ~ 19세" },
  { value: "AGE_20_24", label: "20 ~ 24세" },
  { value: "AGE_25_30", label: "25 ~ 30세" },
  { value: "AGE_OVER_30", label: "31세 이상" },
] as const;

export type AgeGroup = typeof AGE_GROUPS[number]["value"];

export default function SelectAgeGroup() {
  const { selectedAgeGroup, handleAgeGroupSelect } = useSelectAgeGroup();

  return (
    <div className="flex flex-col gap-6">
      {/* 나이 제목 */}
      <Label className="text-neutral-600 text-5xl font-normal font-gangwonEduAll leading-[3rem]">
        나이를 알려주세요
      </Label>

      {/* Radio Group으로 나이 그룹 선택 */}
      <RadioGroup
        value={selectedAgeGroup || undefined}
        onValueChange={(value) =>
          handleAgeGroupSelect(value as (typeof AGE_GROUPS)[number]["value"])
        }
        className="grid grid-cols-2 gap-6 w-full max-w-[42.375rem]"
      >
        {AGE_GROUPS.map((ageGroup) => (
          <div key={ageGroup.value} className="flex">
            <RadioGroupItem value={ageGroup.value} id={ageGroup.value} className="sr-only" />
            <Label
              htmlFor={ageGroup.value}
              className={cn(
                "flex items-center justify-center w-80 h-28 rounded-[0.625rem] cursor-pointer transition-all duration-200 ease-in-out",
                "text-3xl font-medium font-['Pretendard'] leading-9 text-center",
                selectedAgeGroup === ageGroup.value
                  ? "!bg-primary-light border-[0.1875rem] !border-primary text-primary font-bold"
                  : "bg-gray-400 text-gray-900 hover:bg-gray-400/90"
              )}
            >
              {ageGroup.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
