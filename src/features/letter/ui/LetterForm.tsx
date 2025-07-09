"use client";

import { useForm } from "react-hook-form";
import { LetterFormInput } from "./LetterFormInput";

type LetterFormValues = {
  title: string;
  contents: string;
};

export const LetterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LetterFormValues>();

  const onSubmit = (data: LetterFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between">
      <div>
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
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-primary text-white text-[2rem] font-semibold pt-[2.625rem] pb-[2.625rem] m-auto rounded-[0.625rem]"
        >
          편지 보내기
        </button>
      </div>
    </form>
  );
};
