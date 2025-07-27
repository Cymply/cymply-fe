import { useAtom } from "jotai";
import { musicAtom } from "@/store/musicStore";
import {useCallback} from "react";

export default function useSelectMusicItem() {
  const [selectedMusic, setSelectedMusic] = useAtom(musicAtom);

  const handleMusicSelect = (value: {
    title: string;
    artist: string;
    thumbnail: string;
  }) => {
    setSelectedMusic(value);
  };

  const handleSelectedMusicReset = useCallback(() => {
    setSelectedMusic({
      title: "",
      artist: "",
      thumbnail: "",
    });
  }, []);

  return {
    selectedMusic,
    handleMusicSelect,
    handleSelectedMusicReset,
  };
}
