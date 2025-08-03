import Image from "next/image";

export const LiItem = ({
  title,
  onClick,
  isLink = false,
}: {
  title: string;
  onClick: () => void;
  isLink?: boolean;
}) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center justify-between p-8 text-2xl text-4xl"
    >
      {title}
      {isLink && (
        <Image
          src="/icons/ico-arrow-right.svg"
          alt="arrow-right"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
      )}
    </li>
  );
};
