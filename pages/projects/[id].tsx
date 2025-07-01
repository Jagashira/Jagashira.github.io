import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@components/ui/Layout";
import Image from "next/image";
import { Project, projects } from "@/data/projects";
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
          <h1 className="text-2xl font-bold">Project Not Found</h1>
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
      <article className="py-16 px-6 max-w-6xl mx-auto mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div className="mb-8 lg:mb-0 lg:sticky lg:top-24 self-start">
            <Image
              src={projectData.image}
              alt={projectData.title}
              width={1200}
              height={720}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col space-y-10">
            <header>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {projectData.title}
              </h1>
              <p className="text-gray-500">{projectData.desc}</p>
            </header>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: projectData.contentHtml }}
            />

            <section>
              <h2 className="text-2xl font-bold mb-4">🚀 技術スタック</h2>
              <div className="flex flex-wrap gap-3">
                {projectData.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section>
              {projectData.demo || projectData.repo || projectData.link ? (
                <h2 className="text-2xl font-bold mb-4">🔗 関連リンク</h2>
              ) : null}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
                {projectData.repo && (
                  <a
                    href={projectData.repo}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    GitHubリポジトリ →
                  </a>
                )}
                {projectData.link && (
                  <a
                    href={projectData.link}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    関連リンク →
                  </a>
                )}
              </div>
            </section>
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

  const projectsDirectory = path.join(process.cwd(), "data/projects");
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
