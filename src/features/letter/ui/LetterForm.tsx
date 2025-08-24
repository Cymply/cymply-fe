// src/features/letter/ui/LetterForm.tsx

"use client";

import { LetterFormInput } from "./LetterFormInput";
import { LetterFormTextarea } from "./LetterFormTextarea";
import useLetter from "@/features/letter/model/useLetter";

export const LetterForm = ({ id }: { id: string }) => {
  const { register, handleSubmit, watch, onSubmit, errors } = useLetter();
  
  const { register, handleSubmit, watch, onSubmit, errors, clearErrors } = useLetter();
  
  const titleValue = watch("title") || "";
  const contentsValue = watch("contents") || "";
  
  // 실시간 validation 메시지 생성
  const getTitleError = () => {
    if (titleValue.length <= 10 && errors.title?.type === 'maxLength') {
      clearErrors('title'); // 글자수가 줄어들면 maxLength 에러 제거
    }
    if (errors.title?.message) return errors.title.message;
    if (titleValue.length > 10) return "편지 제목은 10자 이내로 작성 가능해요.";
    return undefined;
  };
  
  const getContentsError = () => {
    if (contentsValue.length <= 100 && errors.contents?.type === 'maxLength') {
      clearErrors('contents'); // 글자수가 줄어들면 maxLength 에러 제거
    }
    if (errors.contents?.message) return errors.contents.message;
    if (contentsValue.length > 100) return "편지 내용은 100자 이내로 작성 가능해요.";
    return undefined;
  };
  
  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-[5.25rem]">
        <LetterFormInput
          placeholder="편지 제목을 작성해주세요. (10자 이내)"
          maxLength={10}
          showCount
          error={getTitleError()}
          {...register("title", {
            required: "편지 제목은 필수입니다.",
            maxLength: {
              value: 10,
              message: "편지 제목은 10자 이내로 작성 가능해요.",
            },
          })}
          value={titleValue}
        />
        <LetterFormTextarea
          placeholder="편지 내용을 작성해주세요. (100자 이내)"
          maxLength={100}
          showCount
          error={getContentsError()}
          {...register("contents", {
            required: "편지 내용은 필수입니다.",
            maxLength: {
              value: 100,
              message: "편지 내용은 100자 이내로 작성 가능해요.",
            },
          })}
          value={contentsValue}
        />
      </div>
    </form>
  );
};
