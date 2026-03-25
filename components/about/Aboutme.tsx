import Image from "next/image";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <section className="bg-white py-24 dark:bg-slate-900 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">
              About
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              About Me
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              半導体や IoT のようなハードウェア寄りの領域と、Web開発のようなソフトウェアの領域を横断しながら、仕組みそのものを設計して形にすることに強く惹かれています。
            </p>
            <p className="mt-4 text-base leading-7 text-gray-500 dark:text-gray-400">
              物理世界とデジタル体験がつながるプロダクトに関心があり、デバイス制御からフロントエンド実装まで一気通貫で考えられる開発者を目指しています。
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src="/me/flat-lay.png"
              alt="Desk photo representing Satoshi Egashira"
              width={500}
              height={281}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
