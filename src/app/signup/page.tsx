"use client";

import { Button } from "@/components/ui/button";
import useInput from "@/shared/hooks/useInput";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { value: gender, onChange: handleGenderChange } = useInput("");
  const { value: age, onChange: handleAgeChange } = useInput("");
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
            <div className="flex flex-col gap-2">
              <span>성별</span>
              <div className="flex justify-between gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                />
                남자
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                />
                여자
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col gap-2">
              <span>나이대</span>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="age"
                    value="9"
                    checked={age === "9"}
                    onChange={handleAgeChange}
                  />
                  <label>9세 이하</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="age"
                    value="19"
                    checked={age === "19"}
                    onChange={handleAgeChange}
                  />
                  <label>10 ~ 19세</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="age"
                    value="24"
                    checked={age === "24"}
                    onChange={handleAgeChange}
                  />
                  <label>20 ~ 24세</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="age"
                    value="30"
                    checked={age === "30"}
                    onChange={handleAgeChange}
                  />
                  <label>25 ~ 30세</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="age"
                    value="31"
                    checked={age === "31"}
                    onChange={handleAgeChange}
                  />
                  <label>31세 이상</label>
                </div>
              </div>
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
