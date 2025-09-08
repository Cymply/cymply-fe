import { useAtom } from "jotai";
import { useCallback } from "react";
import { musicAtom } from "@/store/musicStore";

export default function useSelectMusicItem() {
  const [selectedMusic, setSelectedMusic] = useAtom(musicAtom);

  const handleMusicSelect = useCallback(
    (value: { title: string; artist: string; thumbnailUrl: string }) => {
      setSelectedMusic(value);
    },
    [setSelectedMusic]
  );

  const handleSelectedMusicReset = useCallback(() => {
    setSelectedMusic({
      title: "",
      artist: "",
      thumbnailUrl: "",
    });
  }, [setSelectedMusic]);

  return {
    selectedMusic,
    handleMusicSelect,
    handleSelectedMusicReset,
  };
}
