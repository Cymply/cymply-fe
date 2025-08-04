"use client";

import { userApi } from "@/entities/user/api/userApi";
import useLetter from "@/features/letter/model/useLetter";
import { useAuth } from "@/shared/hooks/useAuth";
import { UrlLinkBox } from "@/shared/ui";
import { LetterLinkButton } from "@/shared/ui/LetterLinkButton";
import { LiItem } from "@/shared/ui/liItem";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function MyPage() {
  const router = useRouter();
  const { createUserLink, recipientUrl } = useLetter();
  const { isAuthenticated } = useAuth();
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => userApi.getUserInfo(),
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    const init = async () => {
      await createUserLink();
    };
    init();
  }, [isAuthenticated]);
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
        <UrlLinkBox recipientUrl={recipientUrl} backgroundColor="primary" />
      </div>
      {/* 받은 편지, 보낸편지 영역 */}
      <div className="flex gap-6">
        <LetterLinkButton
          className="w-1/2 h-[13.5rem] flex flex-col justify-between p-9 bg-gray-500 rounded-2xl"
          title="받은 편지"
          onClick={() => {}}
          iconUrl="/images/img-receivedLetter.png"
          count={10}
        />
        <LetterLinkButton
          className="w-1/2 h-[13.5rem] flex flex-col justify-between p-9 bg-gray-500 rounded-2xl"
          title="보낸 편지"
          onClick={() => {}}
          iconUrl="/images/img-sendLetter.png"
          count={10}
        />
      </div>
      {/* 메뉴 리스트 영역 */}
      <ul>
        <LiItem
          title="공지"
          onClick={() => {
            router.push("/notice");
          }}
          isLink
        />
        <LiItem
          title="자주 묻는 질문"
          onClick={() => {
            router.push("/faq");
          }}
          isLink
        />
        <LiItem
          title="문의하기"
          onClick={() => {
            router.push("/qna");
          }}
          isLink
        />
        <LiItem
          title="연동 계정 정보"
          onClick={() => {
            router.push("/connectAccount");
          }}
          isLink
        />
        <LiItem title="로그아웃" onClick={() => {}} />
        <LiItem title="회원탈퇴" onClick={() => {}} />
      </ul>
    </div>
  );
}

export default MyPage;
