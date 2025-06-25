import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="flex justify-between p-6 w-full box-border --header-height">
      <Logo />
    </header>
  );
};
