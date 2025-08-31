import { JSX } from "react";

export interface SignupViewProps {
  header: JSX.Element;
  children: JSX.Element;
  footer: JSX.Element;
}

export default function SignupView(props: SignupViewProps) {
  return (
    <div className="flex flex-col w-full h-full relative overflow-hidden mt-[2.625rem]">
      {/* 메인 컨텐츠 영역 */}
      <div className="relative flex flex-col h-full pb-24">
        {/* 헤더 텍스트 */}
        <div className="mb-[5.5rem] sm:mb-[3rem] md:mb-[5.5rem]">{props.header}</div>

        {/* 메인 컨텐츠 */}
        <div className="relative flex-col flex flex-1 overflow-y-auto">{props.children}</div>

        {/* 푸터 */}
        <div className="relative flex-shrink-0">{props.footer}</div>
      </div>
    </div>
  );
}
