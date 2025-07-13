import { useAtom } from "jotai";
import { musicAtom } from "@/store/musicStore";

export default function useSelectMusicItem() {
  const [selectedMusic, setSelectedMusic] = useAtom(musicAtom);

  const handleMusicSelect = (value: {
    title: string;
    artist: string;
    thumbnail: string;
  }) => {
    setSelectedMusic(value);
  };

  const handleSelectedMusicReset = () => {
    setSelectedMusic({
      title: "",
      artist: "",
      thumbnail: "",
    });
  };

  return {
    selectedMusic,
    handleMusicSelect,
    handleSelectedMusicReset,
  };
}
