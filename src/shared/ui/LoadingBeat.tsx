import Lottie from "lottie-react";
import animationData from "@/assets/json/loadingBeat.json";

export const LoadingBeat = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - var(--header-height))" }}
    >
      <Lottie animationData={animationData} loop style={{ width: "5rem", height: "1rem" }} />
    </div>
  );
};
