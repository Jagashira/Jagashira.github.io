import Layout from "@components/ui/Layout";
import Image from "next/image";
import { projects } from "@/data/projects";
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
      <section className="py-24 sm:py-32 bg-white dark:bg-gray-950">
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
                src="/me/flat-lay.png"
                alt="Emblem of Satoshi Egashira's Skills"
                width={500}
                height={281}
                className="rounded-xl shadow-2xl"
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
                className="border rounded-lg shadow hover:shadow-lg transition bg-white flex flex-col h-full cursor-pointer group"
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
                  <h2 className="font-semibold text-lg">{p.title}</h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3 flex-grow">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs mt-4">
                    {p.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-sm font-semibold text-blue-600 group-hover:underline">
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
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition"
        >
          GitHub で他のリポジトリも見る
        </a>
      </section>
    </Layout>
  );
}
