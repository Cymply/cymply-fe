"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radioGroup";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();

  const handleNext = () => {
    router.push(`/signup/step2?gender=${gender}&age=${age}`);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">회원가입</h1>
        <h2 className="text-xl font-semibold mb-4">타이틀</h2>
        <p className="text-gray-600 mb-8">서브타이틀</p>
        <form>
          <div className="bg-white p-6 rounded-lg shadow ">
            <div className="flex flex-col gap-4">
              <span className="text-lg font-medium">성별</span>
              <RadioGroup
                value={gender}
                onValueChange={setGender}
                orientation="horizontal"
                className="gap-2 flex justify-between"
              >
                <RadioGroupItem value="male" id="male" className="w-full">
                  남자
                </RadioGroupItem>
                <RadioGroupItem value="female" id="female" className="w-full">
                  여자
                </RadioGroupItem>
              </RadioGroup>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col gap-2">
              <span>나이대</span>
              <RadioGroup
                value={age}
                onValueChange={setAge}
                className="grid grid-cols-2 gap-2"
              >
                <RadioGroupItem value="9" id="9" className="w-full">
                  9세 이하
                </RadioGroupItem>
                <RadioGroupItem value="19" id="19" className="w-full">
                  10 ~ 19세
                </RadioGroupItem>
                <RadioGroupItem value="24" id="24" className="w-full">
                  20 ~ 24세
                </RadioGroupItem>
                <RadioGroupItem value="30" id="30" className="w-full">
                  25 ~ 30세
                </RadioGroupItem>
                <RadioGroupItem value="31" id="31" className="w-full">
                  31세 이상
                </RadioGroupItem>
              </RadioGroup>
            </div>
          </div>

          <Button
            className="w-full rounded-lg shadow"
            onClick={handleNext}
            type="button"
          >
            다음
          </Button>
          <Button className="w-full" onClick={handleNext} type="button">
            제공하지 않고 넘어가기
          </Button>
        </form>
      </div>
    </div>
  );
}
