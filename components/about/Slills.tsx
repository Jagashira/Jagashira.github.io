import React from "react";

const Skills = () => (
  <section
    className="py-16 px-6
               bg-gray-50   dark:bg-gray-800"
  >
    <h2
      className="text-2xl font-bold text-center mb-8
                   text-gray-900 dark:text-gray-100"
    >
      Skills
    </h2>

    <div className="flex flex-wrap justify-center gap-3 text-sm">
      {[
        "Next.js",
        "React",
        "Tailwind CSS",
        "TypeScript",
        "Google Apps Script",
        "Node.js",
        "Python",
      ].map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 rounded-full
                     bg-gray-200  text-gray-800
                     dark:bg-gray-700 dark:text-gray-100"
        >
          {skill}
        </span>
      ))}
    </div>
  </section>
);

export default Skills;
