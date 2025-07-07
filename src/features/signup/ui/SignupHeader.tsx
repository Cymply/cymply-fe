// src/features/signup/ui/SignupHeader.tsx
interface SignupHeaderProps {
  highlightTitle: string;
  title : string;
  desc: string;
}

export default function SignupHeader({ highlightTitle, title, desc }: SignupHeaderProps) {
  return (
    <div className="justify-start">
      <span className="text-amber-400 text-6xl font-normal font-['GangwonEduAll_OTF'] leading-[76px]">
        {highlightTitle}
      </span>
      <span className="text-neutral-900 text-6xl font-normal font-['GangwonEduAll_OTF'] leading-[76px]">
        {title}<br/>{desc}
      </span>
    </div>
  )
}