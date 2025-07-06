'use client'

import { useAtom } from 'jotai'
import { ageGroupAtom } from "@/store/signupStore"

type AgeGroup = 'under_9' | '10_19' | '20_24' | '25_30' | 'over_31'

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