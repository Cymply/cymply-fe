'use client'

import { useAtom } from 'jotai'
import { ageGroupAtom } from "@/store/signupStore"
import {AgeGroup} from "@/entities/signup/ui";

export default function useSelectAgeGroup() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useAtom(ageGroupAtom)
  
  const handleAgeGroupSelect = (ageGroup: AgeGroup) => {
    setSelectedAgeGroup(ageGroup)
  }
  
  return {
    selectedAgeGroup,
    handleAgeGroupSelect,
  }
}