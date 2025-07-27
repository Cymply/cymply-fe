import SignupView from "@/widgets/signup/ui/SignupView";
import SignupHeader from "@/features/signup/ui/SignupHeader";
import SignupFooter from "@/features/signup/ui/SignupFooter";
import NicknameForm from "@/features/signup/ui/NicknameForm";
import { Suspense } from "react";

export default function SignupNickname() {
  return (
    <Suspense fallback={<div> 불러오는 중...</div>}>
      <SignupView
        header={<SignupHeader title={"당신을 어떻게"} desc={"부르면 좋을까요?"} />}
        footer={<SignupFooter />}
      >
        <NicknameForm />
      </SignupView>
    </Suspense>
  );
}

// 현재 미사용
// "use client";
//
// import { Button } from "@/components/ui/button";
// import { isEmpty } from "@/lib/utils";
// import useInput from "@/shared/hooks/useInput";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Suspense } from "react";
//
// function Step2Content() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const gender = searchParams.get("gender");
//   const age = searchParams.get("age");
//   const { value: nickName, onChange: handleNickNameChange } = useInput("");
//
//   const handleComplete = () => {
//     // 회원가입 완료 로직
//     console.log(gender, age);
//     if (isEmpty(nickName)) {
//       alert("닉네임을 입력해주세요.");
//       return;
//     }
//     router.push("/dashboard");
//   };
//
//   return (
//     <div className="min-h-screen p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold">회원가입 - 2단계</h1>
//         <input
//           type="text"
//           className="w-full rounded-lg shadow p-4 mb-4"
//           value={nickName}
//           onChange={handleNickNameChange}
//           placeholder="닉네임을 입력해주세요."
//         />
//         <Button className="w-full rounded-lg shadow" onClick={handleComplete}>
//           회원가입 완료
//         </Button>
//       </div>
//     </div>
//   );
// }
//
// export default function Step2Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Step2Content />
//     </Suspense>
//   );
// }
