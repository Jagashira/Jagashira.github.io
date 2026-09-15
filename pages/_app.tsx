import "@/styles/globals.css";
import "@/styles/semiconductor.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fcfcfa" />
        <link rel="icon" href="/portfolio/mark.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
