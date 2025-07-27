import Image from "next/image";

interface SelectMusicBoxProps {
  onGoToSearch: () => void;
}

export const SelectMusicBox = ({ onGoToSearch }: SelectMusicBoxProps) => {
  return (
    <div
      className="flex items-center justify-between w-full pt-[2.625rem] pb-[2.625rem] pl-9 pr-9 border border-black-200 border-dashed rounded-[0.625rem]"
      onClick={onGoToSearch}
    >
      <p className="text-[2rem] text-black-200 font-bold font-gangwonEduAll">
        전해 줄 노래를 선택해주세요.
      </p>
      <Image
        src="/icons/ico-plus.svg"
        alt="ico-plus"
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    </div>
  );
};
