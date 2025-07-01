// pages/_app.tsx
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const DEFAULT_SEO = {
  title: "Jagashira's Portfolio",
  description: "江頭慧のポートフォリオサイトです。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://jagashira.github.io/",
    site_name: "Jagashira's Portfolio",
    images: [
      {
        url: "https://jagashira.github.io/default-og-image.png", // デフォルトのOGP画像
        width: 1200,
        height: 630,
        alt: "Jagashira's Portfolio",
      },
    ],
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
