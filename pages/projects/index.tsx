import Layout from "@components/ui/Layout";
import Image from "next/image";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Projects() {
  return (
    <Layout>
      <section className="bg-gray-900 text-white text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
        <p className="mt-4 text-gray-300">個人開発で作った作品をピックアップ</p>
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
