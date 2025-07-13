import { atom } from "jotai";

export const musicAtom = atom<{
  title: string;
  artist: string;
  thumbnail: string;
}>({
  title: "",
  artist: "",
  thumbnail: "",
});
