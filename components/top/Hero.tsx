import { forwardRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = forwardRef<HTMLDivElement>((_, ref) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: ["-10%", "15%", "-10%"],
            y: ["-15%", "10%", "-15%"],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-sky-200 opacity-30 blur-3xl dark:bg-sky-900/40"
        />
        <motion.div
          animate={{
            x: ["10%", "-15%", "10%"],
            y: ["15%", "-10%", "15%"],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-indigo-200 opacity-30 blur-3xl dark:bg-indigo-900/40"
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl"
          variants={itemVariants}
        >
          Satoshi Egashira
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          variants={itemVariants}
        >
          Web Engineer & Creative Developer
        </motion.p>

        <motion.div className="mt-8 flex gap-x-4" variants={itemVariants}>
          <Link
            href="/projects"
            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            制作物を見る
          </Link>
          <Link
            href="/about"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-800 ring-1 ring-inset ring-gray-300 transition hover:bg-gray-100 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-800"
          >
            私について →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
