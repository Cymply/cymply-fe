import { atom } from "jotai";
import { LetterDetail, Letters } from "@/entities/letter/model/types";

export const userLetterLinkAtom = atom<string>("");

export const letterAtom = atom<LetterDetail | null>(null);

export const lettersAtom = atom<Letters[]>([]);

export const recipientCodeAtom = atom<string | null>(null);

export const recipientUrlAtom = atom<string | null>(null);
