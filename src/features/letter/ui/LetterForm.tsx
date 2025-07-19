"use client";

import { LetterFormInput } from "./LetterFormInput";
import { LetterFormTextarea } from "./LetterFormTextarea";
import useLetter from "@/features/letter/model/useLetter";

export const LetterForm = ({ id }: { id: string }) => {
  const { register, handleSubmit, watch, onSubmit, errors } = useLetter();

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
          error={errors.title?.message}
          {...register("title", {
            required: "편지 제목은 필수입니다.",
            maxLength: {
              value: 10,
              message: "편지 제목은 10자 이내로 작성 가능해요.",
            },
          })}
          value={watch("title") || ""}
        />
        <LetterFormTextarea
          placeholder="편지 내용을 작성해주세요. (100자 이내)"
          maxLength={100}
          showCount
          error={errors.contents?.message}
          {...register("contents", {
            required: "편지 내용은 필수입니다.",
            maxLength: {
              value: 100,
              message: "편지 내용은 100자 이내로 작성 가능해요.",
            },
          })}
          value={watch("contents") || ""}
        />
      </div>
    </form>
  );
};
