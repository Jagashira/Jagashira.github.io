import React from "react";

const Slills = () => {
  return (
    <>
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {[
            "Next.js",
            "React",
            "Tailwind CSS",
            "TypeScript",
            "Google Apps Script",
            "Node.js",
            "Python",
            // "C++",
          ].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-gray-200 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </>
  );
};

export default Slills;
