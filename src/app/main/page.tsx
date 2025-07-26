"use client";

import useLetter from "@/features/letter/model/useLetter";
import { LetterEmpty, LetterList } from "@/features/letter";
import { useEffect, useState, Suspense } from "react";
import { useAtomValue } from "jotai";
import {lettersAtom} from "@/entities/letter/store/letterStore";

function MainPageContent() {
  const letters = useAtomValue(lettersAtom);
  const { getLetters } = useLetter();
  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getLetters().finally(() => setLoading(false));
  }, []);
  
  if (loading) return <p>편지 불러오는 중...</p>;
  console.log(letters);
  
  return letters?.length ? <LetterList letters={letters} /> : <LetterEmpty />;
}

export default function MainPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <p>메인 페이지를 불러오는 중...</p>
      </div>
    }>
      <MainPageContent />
    </Suspense>
  );
}