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
    <div className="w-[750px] h-[1624px] relative bg-white overflow-hidden">
      {/* 상단 헤더 이미지와 네비게이션 */}
      <div className="w-[750px] h-44 left-0 top-0 absolute">
        {/* 뒤로가기 버튼 */}
        <div className="w-12 h-12 left-[25px] top-[110px] absolute">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-0 hover:bg-transparent w-full h-full flex items-center justify-center"
          >
            <ChevronLeft className="size-8 text-black stroke-[3] fill-none"/>
          </Button>
        </div>
      </div>
      
      {/* 메인 컨텐츠 영역 */}
      <div className="relative z-10">
        {/* 헤더 텍스트 */}
        <div className="left-[36px] top-[240px] absolute">
          {props.header}
        </div>
        
        {/* 메인 컨텐츠 */}
        <div className="absolute left-[36px] top-[454px] w-[678px]">
          {props.children}
        </div>
        
        {/* 푸터 */}
        <div className="absolute left-[36px] top-[1325px] w-[678px]">
          {props.footer}
        </div>
      </div>
    </div>
  )
}