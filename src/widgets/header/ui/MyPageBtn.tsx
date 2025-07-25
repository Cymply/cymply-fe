'use client'

import Image from "next/image";
import Link from "next/link";
import {logout} from "@/shared/lib/apiClient";

export const MyPageBtn = () => {
  return (
    <>
      <button onClick={logout}>
        로그아웃
      </button>
      <Link href="/" className="relative w-12 h-12">
        <Image src="/icons/ico-user.svg" alt="icon-user" fill className="object-contain" />
      </Link>
    </>

  );
};
