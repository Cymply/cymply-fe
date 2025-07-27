import { atom } from "jotai";
import { AlertConfig } from "./type";

export const alertAtom = atom<AlertConfig>({
  open: false,
  title: "",
  message: "",
  buttons: [],
});
