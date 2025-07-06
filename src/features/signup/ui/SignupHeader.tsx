// src/features/signup/ui/SignupHeader.tsx
interface SignupHeaderProps {
  title: string;
  desc: string;
}

export default function SignupHeader({ title, desc }: SignupHeaderProps) {
  return (
    <div className="justify-start">
      <span className="text-amber-400 text-6xl font-normal font-['GangwonEduAll_OTF'] leading-[76px]">
        더 섬세한 공감
      </span>
      <span className="text-neutral-900 text-6xl font-normal font-['GangwonEduAll_OTF'] leading-[76px]">
        을 위해<br/>당신을 살짝 알려주세요.
      </span>
    </div>
  )
}