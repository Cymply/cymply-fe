//src/app/signup/info/page.tsx
"use client"

import SignupView from "@/widgets/signup/ui/SignupView";
import SignupHeader from "@/features/signup/ui/SignupHeader";
import SignupFooter from "@/features/signup/ui/SignupFooter";
import SignupProfileForm from "@/features/signup/ui/SignupProfileForm";
import {useRouter, useSearchParams} from "next/navigation";

export default function SignupProfilePage() {
  const searchParams = useSearchParams();

  
  return (
    <SignupView
      header={
        <SignupHeader
          title={"윤슬에 오신 것을 환영해요"}
          desc={"정보 제공 쿠션멘트"}
        />
      }
      footer={
        <SignupFooter/>
      }
    >
      <SignupProfileForm />
    </SignupView>
  )
}
    
    
    
    // <div className="w-[750px] h-[1624px] relative bg-white overflow-hidden">
    //   <img className="w-[750px] h-20 left-0 top-0 absolute" src="https://placehold.co/750x88"/>
    //   <div className="w-[750px] h-28 left-0 top-[88px] absolute bg-white"/>
    //   <div className="w-3.5 h-7 left-[36px] top-[134px] absolute overflow-hidden">
    //     <div
    //       className="w-2.5 h-6 left-[2px] top-[2px] absolute outline outline-[3px] outline-offset-[-1.50px] outline-black"/>
    //   </div>
    //   <div
    //     className="w-96 left-[168px] top-[128px] absolute text-center justify-start text-black text-3xl font-bold font-['Pretendard'] leading-10">회원가입
    //   </div>
    //   <div className="left-[36px] top-[272px] absolute justify-start"><span
    //     className="text-black text-5xl font-semibold font-['Pretendard'] leading-[60px]">윤슬에 오신 것을 환영해요<br/></span><span
    //     className="text-black text-5xl font-normal font-['Pretendard'] leading-[60px]">정보 제공 쿠션멘트</span></div>
    //   <div
    //     className="left-[36px] top-[462px] absolute justify-start text-black text-3xl font-bold font-['Pretendard'] leading-9">성별
    //   </div>
    //   <div className="w-80 h-28 left-[36px] top-[517px] absolute bg-stone-50 rounded-[10px]"/>
    //   <div className="w-80 h-28 left-[384px] top-[517px] absolute bg-stone-50 rounded-[10px]"/>
    //   <div
    //     className="left-[173px] top-[553px] absolute justify-start text-zinc-400 text-3xl font-semibold font-['Pretendard'] leading-9">남성
    //   </div>
    //   <div
    //     className="left-[521px] top-[553px] absolute justify-start text-zinc-400 text-3xl font-semibold font-['Pretendard'] leading-9">여성
    //   </div>
    //   <div
    //     className="left-[36px] top-[697px] absolute justify-start text-black text-3xl font-bold font-['Pretendard'] leading-9">생년월일
    //   </div>
    //   <div className="w-[678px] h-28 left-[36px] top-[752px] absolute rounded-[10px] border border-zinc-400"/>
    //   <div
    //     className="left-[68px] top-[788px] absolute justify-start text-zinc-400 text-3xl font-normal font-['Pretendard'] leading-9">생년월일을
    //     입력해주세요.
    //   </div>
    //   <div className="w-[678px] h-28 left-[36px] top-[1382px] absolute bg-black rounded-[10px]"/>
    // </div>