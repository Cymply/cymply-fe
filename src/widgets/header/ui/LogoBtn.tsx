import Link from "next/link";
import Image from "next/image";

export const LogoBtn = () => {
  return (
    <Link href="/" className="relative w-16 h-16">
      <Image src="/images/logo.svg" alt="logo" fill className="object-contain" />
    </Link>
  );
};
