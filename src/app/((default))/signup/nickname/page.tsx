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
          highlightTitle={"당신"}
          title={"을 어떻게"}
          desc={"부르면 좋을까요?"}
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