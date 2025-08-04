"use client";

import Image from "next/image";
import Link from "next/link";

export const MyPageBtn = () => {
  return (
    <>
      <Link href="/mypage" className="relative w-12 h-12">
        <Image
          src="/icons/ico-user.svg"
          alt="icon-user"
          fill
          className="object-contain"
        />
      </Link>
    </>
  );
};
