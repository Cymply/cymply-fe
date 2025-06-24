import { clsx, type ClassValue } from "clsx";
import _ from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmpty(arg: unknown): boolean {
  if (!arg) return true; // 0 = true 처리됨
  if (typeof arg === "object") {
    return _.isEmpty(arg);
  }
  return false;
}
