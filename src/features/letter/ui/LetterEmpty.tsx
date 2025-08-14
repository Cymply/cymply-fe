import { UrlLinkBox } from "@/shared/ui";

export const LetterEmpty = () => {
  return (
    <div className="flex flex-col gap-[3.75rem] mt-[6.25rem]">
      <div className="flex flex-col gap-12 font-gangwonEduAll font-bold">
        <h3 className="text-black-800 text-[4rem] leading-tight">
          ✉️ 아직 도착한 <br />
          편지가 없어요
        </h3>
        <h3 className="text-black-800 text-[4rem] leading-tight">
          편지를 받으려면 <br />
          링크를 공유해야 해요
        </h3>
      </div>
      <p className="font-gangwonEduAll font-bold text-black-300 text-4xl leading-snug">
        이 링크를 아는 사람만 <br />
        당신에게 편지를 보낼 수 있어요.
      </p>
      <UrlLinkBox />
    </div>
  );
};
