"use client";

import { Input } from "@/components/ui/Input";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import clsx from "clsx";

import { validateNickname, checkNicknameDuplicate } from "@/utils/nicknameUtils";
import { NicknameInputStatus } from "@/entities/signup/model/types";
import useNickname from "@/entities/signup/hooks/useNickname";

type SetNicknameProps = {
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
};

export default function SetNickname({ placeholder, maxLength, showCount }: SetNicknameProps) {
  const { nickname, validation, inputStatus, handleNicknameChange } = useNickname();

  const isOverLimit = maxLength !== undefined && nickname.length > maxLength;
  return (
    <>
      <div className="w-full relative">
        {/* 닉네임 입력 필드 */}
        <Input
          type="text"
          placeholder={placeholder}
          value={nickname}
          onChange={(e) => handleNicknameChange(e.target.value)}
          className={cn(
            "w-full border-b border-gray-800 pt-[2.625rem] pb-[2.625rem] shadow-none bg-transparent focus:outline-none",
            inputStatus === "valid" && "text-black",
            validation.errorMessage && !validation.isDuplicate
              ? "border-states-red"
              : "border-gray-800"
          )}
          maxLength={12}
        />

        {/* 상태 아이콘 */}
        <div className="absolute right-6 top-[3.25rem]">
          {validation.isChecking && <Loader2 className="h-8 w-8 animate-spin text-blue-500" />}
          {inputStatus === "valid" && <CheckCircle2 className="h-8 w-8 text-green-500" />}
          {(inputStatus === "duplicate" || inputStatus === "error") && (
            <XCircle className="h-8 w-8 text-states-red" />
          )}
        </div>

        {/* 글자 수 */}
        {showCount && (
          <div className="pt-[1.5rem]">
            <p className={clsx("text-[2rem]", isOverLimit ? "text-states-red" : "text-gray-900")}>
              ({nickname.length}
              {maxLength ? `/${maxLength}` : ""})
            </p>
          </div>
        )}
      </div>

      {/* 안내 텍스트 */}
      <div className="space-y-3">
        {/* 주의사항 */}
        <div className="text-black text-3xl font-normal font-['Pretendard'] leading-9">
          별명은 한번 정하면 바꿀 수 없어요!
        </div>

        {/* 에러 메시지 (중복된 별명) */}
        {validation.isDuplicate && (
          <div className="text-zinc-400 text-3xl font-normal font-['Pretendard'] leading-9">
            * 중복된 별명입니다.
          </div>
        )}

        {/* 기타 에러 메시지 */}
        {validation.errorMessage && !validation.isDuplicate && (
          <div className="text-zinc-400 text-3xl font-normal font-['Pretendard'] leading-9">
            * {validation.errorMessage}
          </div>
        )}

        {/* 성공 메시지 */}
        {inputStatus === "valid" && (
          <div className="text-green-500 text-3xl font-normal font-['Pretendard'] leading-9">
            * 사용 가능한 별명입니다.
          </div>
        )}

        {/*/!* 사용 가능한 문자 안내 *!/*/}
        {/*<div className="text-zinc-400 text-3xl font-normal font-['Pretendard'] leading-9">*/}
        {/*  * 영어 대소문자, 한글, _, #, !만 사용 가능합니다.*/}
        {/*</div>*/}
      </div>
    </>
  );
}
