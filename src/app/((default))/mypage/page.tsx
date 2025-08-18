import { userApi } from "@/entities/user/api/userApi";
import { LetterState } from "@/features/myPage/letterState";
import Menu from "@/features/myPage/menu";
import { UrlLinkBox } from "@/shared/ui";

export default async function MyPage() {
  const userInfo = await userApi.getUserInfo();

  return (
    <div className="w-full h-full flex flex-col gap-10">
      {/* 회원정보 영역 */}
      <div className="flex flex-col items-center gap-6 font-gangwonEduAll flex-shrink-0 gap-12 ">
        <div className="flex items-center gap-2 text-2xl w-full py-9">
          <div className="w-24 h-24 bg-gray-500 rounded-12"></div>
          <div className="flex items-center gap-2">
            <span className="font-bold">{userInfo?.content?.nickname}</span> 님
          </div>
        </div>
        <UrlLinkBox recipientUrl={""} backgroundColor="primary" />
      </div>
      {/* 받은 편지, 보낸편지 영역 */}
      <LetterState />
      {/* 메뉴 리스트 영역 */}
      <Menu />
    </div>
  );
}
