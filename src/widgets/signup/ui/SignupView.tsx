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
    <div className="w-full h-full relative overflow-hidden flex-col gap-1">
      {/* 메인 컨텐츠 영역 */}
      <div className="relative flex flex-col gap-10 h-full pb-10">
        {/* 헤더 텍스트 */}
        <div className="">
          {props.header}
        </div>
        
        {/* 메인 컨텐츠 */}
        <div className="relative flex-col flex h-full">
          {props.children}
        </div>
        
        {/* 푸터 */}
        <div className="relative">
          {props.footer}
        </div>
      </div>
    </div>
  )
}