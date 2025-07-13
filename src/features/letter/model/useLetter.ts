import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { letterApi } from "@/entities/letter/api/letterApi";
import { LetterFormValues } from "@/features/letter/model/types";
import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { letterAtom, lettersAtom, userLetterLinkAtom } from "@/entities/letter/store/letterStore";

export default function useLetter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [userLetterLink, setUserLetterLink] = useAtom<string>(userLetterLinkAtom);
  const [letter, setLetter] = useAtom(letterAtom);
  const [letters, setLetters] = useAtom(lettersAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LetterFormValues>();

  // 편지 보내기
  const onSubmit = async (data: LetterFormValues) => {
    const userCode = searchParams.get("user-code") || "12345678";
    try {
      const res = await letterApi.sendLetter({
        receipt: userCode,
        content: data.contents,
      });
      if (res.status != 200) {
        throw res.statusText;
      }
      router.push("/letter/sent");
    } catch (error) {
      console.error(error);
    }
  };

  // 나의 편지를 받을 주소 생성하는 곳
  const createUserLink = useCallback(async () => {
    try {
      const res = await letterApi.createUserLetterLink();
      console.log("내 편지 받을 링크 조회", res);
      if (res.status != 200) throw res.statusText;
      setUserLetterLink(res.data.data?.content?.link);
    } catch (error) {
      console.error(error);
    }
  }, [userLetterLink]);

  // 편지 하나 조회
  const getLetter = useCallback(
    async (letterId: string) => {
      try {
        const res = await letterApi.getLetter(letterId);
        // console.log("편지 조회 단건", res)
        if (res.status != 200) throw res.statusText;
        setLetter(res.data.data.letters);
      } catch (error) {
        console.error(error);
      }
    },
    [letter]
  );

  // 내 편지 목록 전체 조회
  const getLetters = useCallback(async () => {
    try {
      const res = await letterApi.getLetters();
      // console.log("내 편지들 조회", res)
      if (res.status != 200) throw res.statusText;
      setLetters(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [letters]);

  // 조회 테스트
  useEffect(() => {
    getLetters();
    getLetter("1");
    createUserLink();
  }, [getLetters, getLetter, createUserLink]);

  return {
    register,
    handleSubmit,
    watch,
    onSubmit,
    errors,
    createUserLink,
    getLetter,
    getLetters,
  };
}
