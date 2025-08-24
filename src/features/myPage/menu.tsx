import Link from "next/link";
import { LiItem } from "@/shared/ui/liItem";
import { LogoutButton } from "@/features/myPage/ui/LogoutButton";

export default function Menu() {
  return (
    <ul>
      <LiItem asChild isLink rightIcon>
        <Link
          href="https://www.notion.so/2458d05bbad380e19072e76d7dc36fa0?source=copy_link"
          className="w-full flex items-center justify-between text-[2rem]"
        >
          <span>공지</span>
        </Link>
      </LiItem>

      <LiItem asChild isLink rightIcon>
        <Link
          href="https://www.notion.so/2458d05bbad3808084d1ffcc09dbdb5f?source=copy_link"
          className="w-full flex items-center justify-between text-[2rem]"
        >
          <span>자주 묻는 질문</span>
        </Link>
      </LiItem>

      <LiItem asChild isLink rightIcon>
        <Link href="/mypage/qna" className="w-full flex items-center justify-between text-[2rem]">
          <span>문의하기</span>
        </Link>
      </LiItem>

      {/* <LiItem asChild isLink rightIcon>
        <Link
          href="/connectAccount"
          className="w-full flex items-center justify-between text-[2rem]"
        >
          <span>연동 계정 정보</span>
        </Link>
      </LiItem> */}

      {/* 로그아웃 */}
      <li>
        <LogoutButton className="w-full flex items-center justify-between py-8 text-[2rem] text-left text-black-300">
          로그아웃
        </LogoutButton>
      </li>

      <li>
        <form>
          <button
            type="submit"
            className="w-full flex items-center justify-between py-8 text-4xl text-left text-black-300"
          >
            회원탈퇴
          </button>
        </form>
      </li>
    </ul>
  );
}
