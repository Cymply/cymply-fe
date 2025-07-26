import Lottie from "lottie-react";
import animationData from "@/assets/json/loadingSpinner.json";

export const LoadingSpinner = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - var(--header-height))" }}
    >
      <Lottie animationData={animationData} loop style={{ width: "5rem", height: "5rem" }} />
    </div>
  );
};
