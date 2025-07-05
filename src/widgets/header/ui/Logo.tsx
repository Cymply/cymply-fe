import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/" className="relative w-24 h-24">
      <Image src="/images/logo.svg" alt="logo" fill className="object-contain" />
    </Link>
  );
};
