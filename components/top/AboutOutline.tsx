import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code, Bot } from "lucide-react";

const AboutOutline = () => {
  return (
    <section
      id="about"
      className="relative bg-white py-24 sm:py-32 dark:bg-slate-900"
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
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">
              About
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              About Me
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              半導体や IoT のようなハードウェア寄りの領域と、Web開発のようなソフトウェアの領域を横断しながら、仕組みそのものを設計して形にすることに強く惹かれています。
            </p>
            <p className="mt-4 text-base leading-7 text-gray-500 dark:text-gray-400">
              物理世界とデジタル体験がつながるプロダクトに関心があり、デバイス制御からフロントエンド実装まで一気通貫で考えられる開発者を目指しています。
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
            <div className="rounded-2xl bg-sky-50 p-6 ring-1 ring-inset ring-sky-200/50 dark:bg-sky-900/30 dark:ring-sky-700/50">
              <Bot size={32} className="text-sky-600 dark:text-sky-300" />

              <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
                半導体・IoT
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                物理世界を扱う設計や制御への関心
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-6 ring-1 ring-inset ring-indigo-200/50 dark:bg-indigo-900/30 dark:ring-indigo-700/50">
              <Code
                size={32}
                className="text-indigo-600 dark:text-indigo-300"
              />

              <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
                Web開発
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                UI からアプリケーション実装まで形にする力
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutOutline;
