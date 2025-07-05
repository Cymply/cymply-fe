// src/widgets/signup/ui/SignupView.tsx
'use client'

import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export interface SignupViewProps {
  header: any;
  children: any;
  footer: any;
}

export default function SignupView(props: SignupViewProps) {
  const router = useRouter()
  
  const handleBack = () => {
    router.back()
  }
  
  return (
    <div className="w-[750px] h-[1624px] bg-white flex flex-col">
      {/* 네비게이션 바 */}
      <div className="h-28 bg-white flex items-center justify-between px-9">
        {/* 뒤로가기 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="p-0 hover:bg-transparent"
        >
          <ChevronLeft className="w-6 h-6 text-black stroke-[3]" />
        </Button>
        
        {/* 회원가입 타이틀 */}
        <div className="flex-1 text-center">
          <h1 className="text-black text-3xl font-bold font-['Pretendard'] leading-10">
            회원가입
          </h1>
        </div>
        
        {/* 오른쪽 공간 (균형을 위해) */}
        <div className="w-6"></div>
      </div>
      
      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 px-9 flex flex-col">
        {/* 헤더 텍스트 */}
        <div className="pt-16 pb-10">
          {props.header}
        </div>
        
        {/* 메인 컨텐츠 */}
        <div className="flex-1">
          {props.children}
        </div>
      </div>
      
      {/* 푸터 */}
      <div className="px-9 pb-8">
        {props.footer}
      </div>
    </div>
  )
}
