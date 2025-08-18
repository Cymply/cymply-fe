import { LetterState } from "@/features/myPage/letterState";
import Menu from "@/features/myPage/menu";
import { UrlLinkBox } from "@/shared/ui";
import { UserInfo } from "@/features/myPage/ui/userInfo";

export default function MyPage() {
  return (
    <div className="w-full h-full flex flex-col gap-10">
      {/* 회원정보 영역 */}
      <div className="flex flex-col items-center flex-shrink-0 gap-[3.75rem]">
        <UserInfo />
        <UrlLinkBox backgroundColor="primary" />
      </div>
      {/* 받은 편지, 보낸편지 영역 */}
      <LetterState />
      {/* 메뉴 리스트 영역 */}
      <Menu />
    </div>
  );
}
