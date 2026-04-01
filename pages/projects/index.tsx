import Layout from "@components/ui/Layout";
import Image from "next/image";
import { projects } from "@/data/projects/projects";
import { motion } from "framer-motion";
import Link from "next/link";
import { NextSeo } from "next-seo";
import fs from "fs";
import path from "path";

type ProjectsProps = {
  contributionMeta: {
    total: number | null;
    updatedAt: string | null;
  };
};

const contributionLegendColors = [
  "#ebedf0",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
];

export default function Projects({ contributionMeta }: ProjectsProps) {
  return (
    <Layout>
      <NextSeo
        title="Projects| Jagashira's Portfolio"
        description="江頭慧が開発した制作物についてのページです。"
      />
      <section className="bg-white py-24 dark:bg-slate-900 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2">
            {/* 左カラム：テキスト */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Projects
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                独学と探求心で形にしてきた、個人開発の制作物一覧です。Webアプリケーションからハードウェア制御、AI連携まで、幅広い分野での挑戦をご覧ください。
              </p>
            </motion.div>

            {/* 右カラム：画像 */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            >
              <div className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 px-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      GitHub Activity
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
                      <p className="text-base font-semibold text-slate-900 dark:text-white">
                        {contributionMeta.total !== null
                          ? `${contributionMeta.total} contributions in the last year`
                          : "Contribution chart"}
                      </p>
                      <p>Private contributions included</p>
                      {contributionMeta.updatedAt && <p>Updated {contributionMeta.updatedAt}</p>}
                    </div>
                  </div>
                  <a
                    href="https://github.com/Jagashira"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-slate-200 px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    View Profile
                  </a>
                </div>
                <div className="relative h-[180px] overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40">
                  <Image
                    src="/github/contributions.svg"
                    alt="GitHub contribution activity chart"
                    width={1080}
                    height={180}
                    className="absolute right-0 top-0 h-full w-auto max-w-none"
                    priority
                  />
                </div>
                <div className="mt-3 flex items-center justify-end gap-2 px-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    {contributionLegendColors.map((color) => (
                      <span
                        key={color}
                        className="h-3.5 w-3.5 rounded-[4px] border border-white/70 dark:border-slate-900/60"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} passHref>
              <motion.div
                className="flex h-full cursor-pointer flex-col rounded-lg border border-gray-200 bg-white shadow transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="rounded-t-lg transition-transform duration-300 group-hover:scale-105 object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {p.title}
                  </h2>
                  <p className="mt-1 flex-grow line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs mt-4">
                    {p.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-200 px-2 py-0.5 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-sm font-semibold text-blue-600 group-hover:underline dark:text-blue-400">
                    詳細を見る →
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 text-center">
        <a
          href="https://github.com/jagashira"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-gray-900 px-8 py-3 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          GitHub で他のリポジトリも見る
        </a>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const svgPath = path.join(
    process.cwd(),
    "public",
    "github",
    "contributions.svg",
  );

  let contributionMeta = {
    total: null as number | null,
    updatedAt: null as string | null,
  };

  try {
    const svg = fs.readFileSync(svgPath, "utf8");
    const totalMatch = svg.match(/<title[^>]*>(\d+) GitHub contributions in the last year<\/title>/);
    const updatedMatch = svg.match(/updated (\d{4}-\d{2}-\d{2})/i);

    contributionMeta = {
      total: totalMatch ? Number(totalMatch[1]) : null,
      updatedAt: updatedMatch ? updatedMatch[1] : null,
    };
  } catch {
    contributionMeta = {
      total: null,
      updatedAt: null,
    };
  }

  return {
    props: {
      contributionMeta,
    },
  };
}
