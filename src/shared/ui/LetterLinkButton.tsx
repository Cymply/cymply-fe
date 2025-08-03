"use client";

import Image from "next/image";

interface LetterLinkButtonProps {
  title: string;
  onClick: () => void;
  iconUrl: string;
  className?: string;
  count: number;
}

export const LetterLinkButton = ({
  title,
  onClick,
  iconUrl,
  className,
  count,
}: LetterLinkButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      <div className="flex items-center gap-4 justify-between text-left">
        <Image
          src={iconUrl}
          alt={title}
          width={20}
          height={20}
          className="w-[3.375rem] h-[3.375rem] object-contain"
        />
        <span className="w-full text-black-800 text-2xl font-bold">
          {title}
        </span>
      </div>
      <div className="flex items-end gap-2 justify-end ">
        <span className="text-black-800 text-4xl font-bold">{count} </span>통
      </div>
    </button>
  );
};
