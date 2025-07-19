import { atom, useAtom } from "jotai";
import { Letter } from "@/entities/letter/model/types";

export const userLetterLinkAtom = atom<string>("");

export const letterAtom = atom<Letter | null>(null);

export const lettersAtom = atom<Letter[]>([]);
