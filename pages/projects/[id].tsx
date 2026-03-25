import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@components/ui/Layout";
import Image from "next/image";
import { Project, projects } from "@/data/projects/projects";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { NextSeo } from "next-seo";

type ProjectData = Project & {
  contentHtml: string;
};

type ProjectDetailProps = {
  projectData: ProjectData;
};

export default function ProjectDetail({ projectData }: ProjectDetailProps) {
  if (!projectData) {
    return (
      <Layout>
        <section className="py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Project Not Found
          </h1>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <NextSeo
        title={`${projectData.title} | Jagashira's Portfolio`}
        description={projectData.desc}
        openGraph={{
          title: `${projectData.title} | Jagashira's Portfolio`,
          description: projectData.desc,
          images: [
            {
              url: `https://jagashira.github.io/projects/${projectData.image}`,
              width: 1200,
              height: 720,
              alt: projectData.title,
            },
          ],
        }}
      />
      <article className="mx-auto mt-4 max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="lg:sticky lg:top-24 self-start">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <Image
                src={projectData.image}
                alt={projectData.title}
                width={1200}
                height={720}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-8">
            <header className="rounded-3xl border border-gray-200 bg-white/90 p-8 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">
                Project Detail
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl">
                {projectData.title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                {projectData.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {projectData.tech.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div
                className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-8 prose-strong:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-li:text-gray-700 prose-li:marker:text-gray-400 prose-ul:pl-6 dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white dark:prose-a:text-blue-400 dark:prose-li:text-gray-300 dark:prose-li:marker:text-gray-500"
                dangerouslySetInnerHTML={{ __html: projectData.contentHtml }}
              />
            </section>

            {(projectData.demo || projectData.repo || projectData.link) && (
              <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  関連リンク
                </h2>
                <div className="flex flex-wrap gap-3">
                  {projectData.repo && (
                    <a
                      href={projectData.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                    >
                      GitHubリポジトリ
                    </a>
                  )}
                  {projectData.link && (
                    <a
                      href={projectData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
                    >
                      関連リンク
                    </a>
                  )}
                  {projectData.demo && (
                    <a
                      href={projectData.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/60"
                    >
                      デモを見る
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
}

const projectsDirectory = path.join(process.cwd(), "data/projects");

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map((p) => ({
    params: { id: p.id },
  }));
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps<ProjectDetailProps> = async ({
  params,
}) => {
  const id = params?.id as string;

  // 1. `projects.ts` からメタデータを取得
  const projectMetadata = projects.find((p) => p.id === id);

  if (!projectMetadata) {
    return { notFound: true };
  }

  const projectsDirectory = path.join(process.cwd(), "data/projects/docs");
  const fullPath = path.join(projectsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const projectData: ProjectData = {
    ...projectMetadata,
    contentHtml,
  };

  return {
    props: {
      projectData,
    },
  };
};
