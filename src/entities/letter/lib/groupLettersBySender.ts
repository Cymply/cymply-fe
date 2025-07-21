import { Letter } from "../model/types";

// senderId가 같은 편지 그룹화
export function groupLettersBySender(letters: Letter[]): Letter[][] {
  const groups: Record<number, Letter[]> = {};

  letters.forEach((letter) => {
    if (!letter.senderId) return;
    if (!groups[letter.senderId]) groups[letter.senderId] = [];
    groups[letter.senderId].push(letter);
  });

  return Object.values(groups);
}
