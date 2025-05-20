import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CTA = () => (
  <section
    className="py-20 text-center
                      bg-white dark:bg-gray-900"
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link
        href="/projects"
        className="inline-block rounded-full px-8 py-3 transition
                   bg-gray-900  text-white  hover:bg-gray-700
                   dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
      >
        プロジェクトを見る
      </Link>
    </motion.div>
  </section>
);

export default CTA;
