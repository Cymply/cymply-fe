import { Letter } from "../model/types";

// senderId가 같은 편지 그룹화
export function groupLettersBySender(letters: Letter[]): Letter[][] {
  const groups: Record<number, Letter[]> = {};

  letters.forEach((letter) => {
    if (letter.letterId === undefined || letter.letterId) return;
    if (!groups[letter.letterId]) {
      groups[letter.letterId] = [];
    }
    groups[letter.letterId].push(letter);
  });

  return Object.values(groups);
}
