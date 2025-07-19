// src/features/signup/ui/SignupHeader.tsx
interface SignupHeaderProps {
  highlightTitle: string;
  title: string;
  desc: string;
}

export default function SignupHeader({ highlightTitle, title, desc }: SignupHeaderProps) {
  return (
    <div className="justify-start">
      <span className="text-primary text-6xl font-bold font-gangwonEduAll leading-[4.75rem]">
        {highlightTitle}
      </span>
      <span className="text-black-800 text-6xl font-bold font-gangwonEduAll leading-[4.75rem]">
        {title}
        <br />
        {desc}
      </span>
    </div>
  );
}
