import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        gangwonEduAll: ["var(--font-gangwonEduAll)"],
      },
      boxShadow: {
        button: "0px -30px 30px rgba(255, 255, 255, 0.5)",
      },
      colors: {
        ...colors,
        background: "#ffffff",
        foreground: "#111111",
        black: {
          "900": "#000000", // black-900
          "800": "#111111",
          "700": "#191F28",
          "600": "#333333",
          "500": "#404040",
          "400": "#555555",
          "300": "#666666",
          "200": "#999999",
        },
        gray: {
          "900": "#aaaaaa", // gray-900
          "800": "#cccccc",
          "700": "#dddddd",
          "600": "#f5f5f5",
          "500": "#f6f6f6",
          "400": "#F8F8F8",
          "100": "#FFFFFF",
        },
        primary: {
          DEFAULT: "#EEB33D", // 기본(primary)
          dark: "#EEB33D", // 진한색(primary-dark)
          light: "#FFF7E4", // 밝은색(primary-light)
        },
        borderColor: {
          focus: "#EEB33D",
          dashed: "#A99983",
        },
        kakao: {
          yellow: "#FBE300",
          black: "#3b1e1e",
        },
        states: {
          red: "#DD0000",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".gradient-grad": {
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 74.57%, rgba(238, 179, 61, 0.3) 123.03%)",
        },
      });
    }),
  ],
} satisfies Config;
