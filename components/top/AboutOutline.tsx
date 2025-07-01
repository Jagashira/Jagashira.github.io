import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code, Bot } from "lucide-react";

const AboutOutline = () => {
  return (
    <section
      id="about"
      className="relative bg-white py-24 sm:py-32 dark:bg-gray-950"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 items-start gap-x-8 gap-y-16 lg:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              About Me
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              機械工学のバックグラウンドを持ち、ロボット技術を探求する傍ら、独学でWeb開発の世界に情熱を注いでいます。ハードウェアの知見とソフトウェアの技術を融合させ、実世界の問題を解決するプロダクトを創り出すことを目指しています。
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-block rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                詳しく見る →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 grid-rows-1 gap-4 sm:gap-6 lg:gap-8">
            <div className="rounded-2xl bg-sky-50 p-6 ring-1 ring-inset ring-sky-200/50 dark:bg-sky-900/20 dark:ring-sky-800/50">
              <Bot size={32} className="text-sky-600 dark:text-sky-300" />

              <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
                機械工学 & ロボティクス
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                物理的な世界を動かす技術の基礎
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-6 ring-1 ring-inset ring-indigo-200/50 dark:bg-indigo-900/20 dark:ring-indigo-800/50">
              <Code
                size={32}
                className="text-indigo-600 dark:text-indigo-300"
              />

              <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
                Web開発
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                アイデアを形にするデジタルな創造力
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutOutline;
