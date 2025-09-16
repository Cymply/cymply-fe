'use client'

import { useAtom } from 'jotai'
import { ageGroupAtom } from "@/store/signupStore"
import {AgeGroup} from "@/entities/signup/ui";

export default function useSelectAgeGroup() {
  const ageGroup: AgeGroup | undefined = sessionStorage.getItem(
    "selectedAgeGroup"
  ) as AgeGroup | undefined;
  const [selectedAgeGroup, setSelectedAgeGroup] = useAtom(
    ageGroupAtom || ageGroup
  );

  const handleAgeGroupSelect = (ageGroup: AgeGroup) => {
    sessionStorage.setItem("selectedAgeGroup", ageGroup);
    setSelectedAgeGroup(ageGroup);
  };

  return {
    selectedAgeGroup,
    handleAgeGroupSelect,
  }
}