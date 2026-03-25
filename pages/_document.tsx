import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body className="antialiased bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
