import { Alert } from "@/widgets/alert";
import { BackBtn } from "@/widgets/header/ui/BackBtn";

export default function mypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex flex-col w-full gradient-grad">
      <Alert />
      <div className="flex items-center justify-between p-[1.5625rem] w-full box-border h-[var(--header-height)]">
        <BackBtn />
        <p className="pr- text-center font-semibold text-4xl text-black-700">마이페이지</p>
        <div></div>
      </div>
      <div className={`flex flex-col w-full h-full px-9`}>{children}</div>
    </main>
  );
}
