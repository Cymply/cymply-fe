import Image from "next/image";
import { ReactNode } from "react";
import clsx from "clsx";

type LiItemBaseProps = {
  title?: string;
  isLink?: boolean;
  className?: string;
  rightIcon?: boolean;
  asChild?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

export function LiItem({
  title,
  isLink = false,
  className,
  rightIcon = false,
  asChild = false,
  children,
  onClick,
}: LiItemBaseProps) {
  const content = (
    <>
      <span>{title}</span>
      {isLink
        ? rightIcon && (
            <Image
              src="/icons/ico-arrow-right.svg"
              alt="arrow-right"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          )
        : null}
    </>
  );

  if (asChild && children) {
    // 부모가 <Link>를 감싸줄 때: <LiItem asChild><Link ...>...</Link></LiItem>
    return (
      <li
        className={clsx(
          "flex items-center justify-between py-8 text-2xl cursor-pointer",
          className
        )}
      >
        {children}
        {isLink
          ? rightIcon && (
              <Image
                src="/icons/ico-arrow-right.svg"
                alt="arrow-right"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            )
          : null}
      </li>
    );
  }

  return (
    <li className={clsx("p-0", className)}>
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between py-8 text-2xl text-left"
      >
        {content}
      </button>
    </li>
  );
}
