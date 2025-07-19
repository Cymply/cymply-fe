"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const BackBtn = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button onClick={handleGoBack} className="relative w-9 h-9">
      <Image
        src="/icons/ico-arrow-left.svg"
        alt="icon-arrow-left"
        fill
        className="object-contain"
      />
    </button>
  );
};
