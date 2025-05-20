import { forwardRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = forwardRef<HTMLDivElement>((_, ref) => (
  <section
    ref={ref}
    className="flex flex-col justify-center items-center h-screen text-center px-4"
  >
    <motion.h1
      className="text-4xl md:text-6xl font-bold"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      江頭 慧
    </motion.h1>

    <motion.p
      className="mt-4 text-lg text-gray-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      創造と技術で魅せる、Webエンジニア。
    </motion.p>

    <motion.div
      className="mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <Link
        href="/about"
        className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition"
      >
        私について
      </Link>
    </motion.div>
  </section>
));
Hero.displayName = "Hero";
export default Hero;
