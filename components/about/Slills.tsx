import React from "react";
import { motion } from "framer-motion";

// スキルをカテゴリごとに整理
const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend & API",
    skills: ["Node.js", "Python", "Next.js API Routes", "Firebase", "REST API"],
  },
  {
    title: "AI & Automation",
    skills: ["ChatGPT API", "Whisper API", "Google Apps Script", "Remotion"],
  },
  {
    title: "Hardware & Tools",
    skills: ["シリアル通信", "FFmpeg", "VSCode Extension", "Git & GitHub"],
  },
];

const Skills = () => (
  <section className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-2xl lg:text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
          My Capabilities
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Skills & Technologies
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          フロントエンドからAI連携、ハードウェア制御まで、幅広い技術領域でアイデアを形にします。
        </p>
      </motion.div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-950 dark:ring-white/10"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200/50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default Skills;
