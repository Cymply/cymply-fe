import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="flex justify-between p-9 w-full box-border h-[var(--header-height)]">
      <Logo />
    </header>
  );
};
