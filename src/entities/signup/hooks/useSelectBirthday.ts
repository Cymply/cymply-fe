import {useAtom} from "jotai/index";
import {birthdayAtom} from "@/store/signupStore";
import {useState} from "react";

export default function useSelectBirthday(){
  const [birthday, setBirthday] = useAtom(birthdayAtom)
  const [isFocused, setIsFocused] = useState(false)
  
  const handleBirthdayChange = (value: string) => {
    // 숫자만 입력 허용
    const numbersOnly = value.replace(/[^\d]/g, '')
    
    // 최대 8자리까지만 허용 (YYYYMMDD)
    if (numbersOnly.length <= 8) {
      setBirthday(numbersOnly)
    }
  }
  
  // 생년월일 포맷팅 (YYYY-MM-DD 형태로 표시)
  const formatBirthday = (value: string) => {
    if (value.length <= 4) return value
    if (value.length <= 6) return `${value.slice(0, 4)}-${value.slice(4)}`
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
  }
  
  const displayValue = formatBirthday(birthday)
  const isValid = birthday.length === 8
  
  return {
    isFocused,
    setIsFocused,
    handleBirthdayChange,
    displayValue,
    isValid,
  }
}