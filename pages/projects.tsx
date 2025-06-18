import Layout from "@components/ui/Layout";
import Image from "next/image";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gray-900 text-white text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
        <p className="mt-4 text-gray-300">個人開発で作った作品をピックアップ</p>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              className="border rounded-lg shadow hover:shadow-lg transition bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Image
                src={p.image}
                alt={p.title}
                width={400}
                height={240}
                className="object-cover rounded-t-lg"
              />

              <div className="p-4">
                <h2 className="font-semibold text-lg">{p.title}</h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {p.desc}
                </p>

                {/* 技術タグ */}
                <div className="flex flex-wrap gap-2 text-xs mt-3">
                  {p.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* リンク */}
                <div className="mt-4 flex space-x-4 text-sm">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Demo →
                    </a>
                  )}
                  {/* repo がある時だけ表示 */}
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub →
                    </a>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Link →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
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
