import { LogoBtn } from "./LogoBtn";
import { MyPageBtn } from "@/widgets/header/ui/MyPageBtn";

export const Header = () => {
  return (
    <header className="fixed top-0 z-20 flex items-center justify-between pl-9 pr-9 pt-6 pb-6 w-full max-w-[var(--content-width)] box-border h-[var(--header-height)] bg-white">
      <LogoBtn />
      <MyPageBtn />
    </header>
  );
};
