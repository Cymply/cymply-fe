import {usePathname, useRouter} from "next/navigation";
import {useAtomValue} from "jotai";
import {birthdayAtom, genderAtom} from "@/store/signupStore";
import useNickname from "@/entities/signup/hooks/useNickname";
import {authApi} from "@/features/auth/api";
import moment from "moment";
import {apiClient} from "@/shared/lib/apiClient";

export default function useSignupForm() {
  const { nickname, canProceed, validation } = useNickname();
  const selectedGender = useAtomValue(genderAtom);
  const birthday = useAtomValue(birthdayAtom)
  
  
  
  const pathname = usePathname();
  const router = useRouter();
  
  // 현재 경로 확인
  const isSignupNickname = pathname.includes('/signup/nickname');
  
  const handleNext = () => {
    router.push('/signup/nickname');
  }
  
  const handleSubmit = async () => {
    console.log("selectedGender", selectedGender)
    console.log("birthday", moment(birthday, "YYYYMMDD").format("YYYY-MM-DD"))
    console.log("nickname", nickname)
    
    
    try {
        // TODO: 카카오나 구글 회원 가입 후 닉네임 입력까지 마치고 최종 회원가입 버튼 눌러서 API 호출할 곳
        const res = await apiClient.post(`/api/v1/users/signup/oauth2`,{
          nickname:nickname,
          name : nickname,
          gender : selectedGender,
          birth : moment(birthday, "YYYYMMDD").format("YYYY-MM-DD")
        })
      console.log("res", res)
    } catch (error) {
      console.error('회원가입 오류:', error)
      alert('네트워크 오류가 발생했습니다.')
    }
  }
  
  return {
    nickname, canProceed,
    validation,
    handleSubmit,
    handleNext,
    isSignupNickname,
  }
}