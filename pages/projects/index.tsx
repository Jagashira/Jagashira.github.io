import Layout from "@components/ui/Layout";
import Image from "next/image";
import { projects } from "@/data/projects/projects";
import { motion } from "framer-motion";
import Link from "next/link";
import { NextSeo } from "next-seo";

export default function Projects() {
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
              <Image
                src="/me/projects.png"
                alt="Emblem of Satoshi Egashira's Skills"
                width={500}
                height={281}
                className="h-auto rounded-xl shadow-2xl"
                priority
              />
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
