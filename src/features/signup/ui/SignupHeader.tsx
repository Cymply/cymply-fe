// src/features/signup/ui/SignupHeader.tsx
interface SignupHeaderProps {
  title: string;
  desc: string;
}

export default function SignupHeader({ title, desc }: SignupHeaderProps) {
  return (
    <>
      <span className="text-black text-5xl font-semibold font-['Pretendard'] leading-[60px]">
        {title}
        <br />
      </span>
      <span className="text-black text-4xl font-normal font-['Pretendard'] leading-[60px]">
        {desc}
      </span>
    </>
  )
}