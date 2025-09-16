// src/entities/signup/hooks/useSelectSex.ts
import {useAtom} from "jotai/index";
import {genderAtom} from "@/store/signupStore";

export default function useSelectSex() {
  const gender: "M" | "F" | null = sessionStorage.getItem("selectedGender") as
    | "M"
    | "F"
    | null;
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