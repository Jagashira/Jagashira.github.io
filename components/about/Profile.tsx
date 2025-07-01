import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// フッターで使ったSVGアイコンのパスを再利用
const GITHUB_ICON_PATH =
  "M9 19c-4.3 1.4 -4.3-2.5 -6-3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5";
const EMAIL_ICON_PATH =
  "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z";

const AboutProfile = () => (
  <section className="bg-white dark:bg-gray-950 py-24 sm:py-32">
    <motion.div
      className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9 }}
    >
      <div className="flex justify-center lg:justify-start">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Image
            src="/me/flat-lay.png"
            alt="Profile photo of Satoshi Egashira"
            width={288}
            height={288}
            className="rounded-full object-cover shadow-2xl"
            priority
          />
        </motion.div>
      </div>

      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Satoshi Egashira
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          機械工学の物理的な世界と、Web開発のデジタルな世界。この二つを繋ぐことで、今までにない価値を創造できると信じています。現在は、実践的なアプリケーション開発を通じて、アイデアを形にする技術を磨いています。
        </p>

        <div className="mt-8 flex items-center justify-center lg:justify-start gap-x-6">
          <a
            href="https://github.com/jagashira"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={GITHUB_ICON_PATH}
              />
            </svg>
          </a>
          <a
            href="mailto:pyprogjas.3104@gmail.com"
            aria-label="Email"
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={EMAIL_ICON_PATH}
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  </section>
);

export default AboutProfile;
