import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "윤슬",
    description: "마음 위로 번진 빛, 빛을 담은 마음을 전해보세요.",
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: "윤슬",
      description: "마음 위로 번진 빛, 빛을 담은 마음을 전해보세요.",
      images: [
        {
          url: "/images/img-thumbnail.png",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const gangwonEduAll = localFont({
  src: [
    {
      path: "../../public/fonts/GangwonEduAllBold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/GangwonEduAllLight.ttf",
      weight: "300",
    },
  ],
  display: "swap",
  variable: "--font-gangwonEduAll",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${pretendard.variable} ${gangwonEduAll.variable}`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
