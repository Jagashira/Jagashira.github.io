import Head from "next/head";
export function Seo({
  title,
  description = "半導体を研究し、IoTと3Dプリンターでものをつくる。江頭慧の Research × Hardware × Software ポートフォリオ。",
  path = "/",
}: {
  title: string;
  description?: string;
  path?: string;
}) {
  const fullTitle = `${title} — Satoshi Egashira`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`https://jagashira.github.io${path}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://jagashira.github.io${path}`} />
      <meta property="og:locale" content="ja_JP" />
    </Head>
  );
}
