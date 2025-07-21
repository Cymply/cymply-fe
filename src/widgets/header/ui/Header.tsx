import { LogoBtn } from "./LogoBtn";
import { MyPageBtn } from "@/widgets/header/ui/MyPageBtn";

export const Header = () => {
  return (
    <header className="fixed top-0 z-20 flex items-center justify-between p-9 w-[var(--content-width)] max-w-[var(--content-width)] box-border h-[var(--header-height)] bg-white">
      <LogoBtn />
      <MyPageBtn />
    </header>
  );
};
