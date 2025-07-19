import { LogoBtn } from "./LogoBtn";
import { MyPageBtn } from "@/widgets/header/ui/MyPageBtn";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-9 w-full box-border h-[var(--header-height)] bg-white">
      <LogoBtn />
      <MyPageBtn />
    </header>
  );
};
