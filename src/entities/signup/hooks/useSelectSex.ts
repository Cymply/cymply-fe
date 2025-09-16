// src/entities/signup/hooks/useSelectSex.ts
import {useAtom} from "jotai/index";
import {genderAtom} from "@/store/signupStore";

export default function useSelectSex() {
  const [selectedGender, setSelectedGender] = useAtom(genderAtom)
  const handleGenderSelect = (value: 'M' | 'F') => {
    setSelectedGender(value)
  }
  const gender = sessionStorage.getItem("selectedGender");
  const [selectedGender, setSelectedGender] = useAtom(genderAtom || gender);
  const handleGenderSelect = (value: "M" | "F") => {
    sessionStorage.setItem("selectedGender", value);
    setSelectedGender(value);
  };

  return {
    selectedGender,
    handleGenderSelect,
  }
}