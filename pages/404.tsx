import Link from "next/link";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { Seo } from "@/components/portfolio/Seo";
export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <SiteShell>
        <section className="container page-heading not-found">
          <p className="eyebrow">404 / A SMALL DETOUR</p>
          <h1>まだ、かたちのないページ。</h1>
          <p>お探しのページは見つかりませんでした。</p>
          <Link className="button button-primary" href="/">
            ホームに戻る →
          </Link>
        </section>
      </SiteShell>
    </>
  );
}
