import Link from "next/link";
import { LiItem } from "@/shared/ui/liItem";

export default function Menu() {
  return (
    <ul>
      <LiItem asChild isLink rightIcon>
        <Link
          href="/notice"
          className="w-full flex items-center justify-between  text-4xl"
        >
          <span>공지</span>
        </Link>
      </LiItem>

      <LiItem asChild isLink rightIcon>
        <Link
          href="/faq"
          className="w-full flex items-center justify-between  text-4xl"
        >
          <span>자주 묻는 질문</span>
        </Link>
      </LiItem>

      <LiItem asChild isLink rightIcon>
        <Link
          href="/qna"
          className="w-full flex items-center justify-between  text-4xl"
        >
          <span>문의하기</span>
        </Link>
      </LiItem>

      <LiItem asChild isLink rightIcon>
        <Link
          href="/connectAccount"
          className="w-full flex items-center justify-between  text-4xl"
        >
          <span>연동 계정 정보</span>
        </Link>
      </LiItem>

      {/* 로그아웃/탈퇴: Server Action */}
      <li>
        <form>
          <button
            type="submit"
            className="w-full flex items-center justify-between py-8 text-4xl text-left"
          >
            로그아웃
          </button>
        </form>
      </li>

      <li>
        <form>
          <button
            type="submit"
            className="w-full flex items-center justify-between py-8 text-4xl text-left text-red-500"
          >
            회원탈퇴
          </button>
        </form>
      </li>
    </ul>
  );
}
