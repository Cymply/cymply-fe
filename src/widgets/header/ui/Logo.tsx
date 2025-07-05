import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/" className="relative w-16 h-16 sm:w-24 sm:h-24">
      <Image src="/images/logo.svg" alt="logo" fill className="object-contain" />
    </Link>
  );
};
