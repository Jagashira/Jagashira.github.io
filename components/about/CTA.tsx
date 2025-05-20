import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CTA = () => {
  return (
    <>
      <section className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition"
          >
            プロジェクトを見る
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default CTA;
