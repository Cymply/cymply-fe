import { atom } from "jotai";

export const musicAtom = atom<{
  title: string;
  artist: string;
  thumbnailUrl: string;
}>({
  title: "",
  artist: "",
  thumbnailUrl: "",
});
