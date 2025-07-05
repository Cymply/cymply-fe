// src/app/signup/nickname/page.tsx

import SignupView from "@/widgets/signup/ui/SignupView";
import SignupHeader from "@/features/signup/ui/SignupHeader";
import SignupFooter from "@/features/signup/ui/SignupFooter";
import NicknameForm from "@/features/signup/ui/NicknameForm";

export default function SignupNickname() {
  return (
    <SignupView
      header={
        <SignupHeader
          title={"윤슬에 오신 것을 환영해요"}
          desc={"별명을 정해주세요"}
        />
      }
      footer={
        <SignupFooter/>
      }
    >
      <NicknameForm/>
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
//     className="text-black text-5xl font-normal font-['Pretendard'] leading-[60px]">별명을 정해주세요</span></div>
//   <div className="w-[678px] h-28 left-[36px] top-[430px] absolute rounded-[10px] border border-zinc-400"/>
//   <div
//     className="left-[60px] top-[466px] absolute justify-start text-zinc-400 text-3xl font-normal font-['Pretendard'] leading-9">생년월일을
//     입력해주세요.
//   </div>
//   <div className="w-[678px] h-28 left-[36px] top-[814px] absolute bg-black rounded-[10px]"/>
//   <div
//     className="left-[288px] top-[851px] absolute text-center justify-start text-white text-3xl font-semibold font-['Pretendard'] leading-9">회원가입
//     하기
//   </div>
//   <div
//     className="left-[36px] top-[574px] absolute justify-start text-black text-3xl font-normal font-['Pretendard'] leading-9">별명은
//     한번 정하면 바꿀 수 없어요!
//   </div>
//   <div
//     className="left-[36px] top-[634px] absolute justify-start text-zinc-400 text-3xl font-normal font-['Pretendard'] leading-9">*
//     중복된 별명입니다.
//   </div>
//   <div
//     className="left-[36px] top-[682px] absolute justify-start text-zinc-400 text-3xl font-normal font-['Pretendard'] leading-9">*
//     영어 대소문자, 한글, _, #, !만 사용 가능합니다.
//   </div>
// </div>