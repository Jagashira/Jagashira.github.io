import React from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

const ProjectOutline = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          制作物ピックアップ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group relative block aspect-video w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="relative flex h-full flex-col justify-end p-4 sm:p-6">
                <h3 className="text-lg font-bold text-white transition-transform duration-300 group-hover:-translate-y-2">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-white/80 transition-all duration-300 group-hover:mt-2 group-hover:opacity-100 md:opacity-0">
                  {project.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            すべての制作物を見る →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectOutline;
