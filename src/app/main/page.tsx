"use client";

import useLetter from "@/features/letter/model/useLetter";
import { LetterEmpty, LetterList } from "@/features/letter";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { lettersAtom } from "@/entities/letter/store/letterStore";

export default function MainPage() {
  const letters = useAtomValue(lettersAtom);
  const { getLetters } = useLetter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLetters().finally(() => setLoading(false));
  }, [getLetters]);

  if (loading) return <p>편지 불러오는 중...</p>;

  console.log(letters);

  return letters ? <LetterList letters={letters} /> : <LetterEmpty />;
}
