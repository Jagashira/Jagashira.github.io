import Layout from "@components/ui/Layout";
import Link from "next/link";
import { NextSeo } from "next-seo";

export default function CookNoteIndex() {
  return (
    <Layout>
      <NextSeo
        title="CookNote | Jagashira's Portfolio"
        description="料理の学習ノートを蓄積して整理する CookNote のトップページです。"
      />
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            CookNote
          </h1>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            料理の学びを Markdown で参考書のように蓄積し、年間と月間の計画に展開します。
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/cooknote/notes"
              className="rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              知識まとめ
            </Link>
            <Link
              href="/cooknote/plan/year"
              className="rounded-xl border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              年間予定
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
