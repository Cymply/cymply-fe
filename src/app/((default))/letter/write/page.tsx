import { LetterForm } from "@/features/letter";

export default function LetterWritePage() {
  return (
    <div className="flex flex-col gap-12 h-full">
      <div className="flex items-center gap-9">
        <div className="w-[7.5rem] h-[7.5rem] rounded-[0.625rem] bg-gray-700"></div>
        <div className="text-[2rem]">
          <p className="text-black-800">앨범명</p>
          <p className="text-black-300">가수명</p>
        </div>
      </div>
      <div>
        <LetterForm />
      </div>
    </div>
  );
}
