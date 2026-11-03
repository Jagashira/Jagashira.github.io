import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { projects, type Project } from "@/data/projects/projects";
import { projectCategories } from "@/data/portfolio";
import { getProjectHtml } from "@/lib/projects";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { Seo } from "@/components/portfolio/Seo";
import { ArrowIcon } from "@/components/portfolio/Icons";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";

type Props = {
  project: Project;
  content: string;
  nextProject: Pick<Project, "id" | "title">;
};
export default function ProjectPage({ project, content, nextProject }: Props) {
  const externalLinks = [
    { href: project.repo, label: "GitHubでコードを見る" },
    { href: project.demo, label: "デモを見る" },
    { href: project.link, label: "公開ページを見る" },
  ].filter((link) => link.href);
  return (
    <>
      <Seo
        title={project.title}
        description={project.desc}
        path={`/projects/${project.id}/`}
      />
      <SiteShell>
        <article className="container project-detail">
          <header className="page-heading">
            <Link className="text-link back-link" href="/projects/">
              ← All projects
            </Link>
            <p className="eyebrow">
              {projectCategories[project.id]} / PROJECT STORY
            </p>
            <h1>{project.title}</h1>
            <p>{project.desc}</p>
          </header>
          <div className="detail-visual">
            <ProjectVisual project={project} priority />
          </div>
          <div className="project-story-grid">
            <aside className="project-facts">
              <p className="eyebrow">TOOLBOX</p>
              <ul className="tech-tags">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              {externalLinks.length > 0 && (
                <div className="project-external-links">
                  {externalLinks.map((link) => (
                    <a
                      className="text-link"
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                      <ArrowIcon diagonal />
                    </a>
                  ))}
                </div>
              )}
              <Link className="text-link" href="/#contact">
                このプロジェクトについて話す <ArrowIcon diagonal />
              </Link>
            </aside>
            <div
              className="reading-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          <nav className="next-project" aria-label="次のプロジェクト">
            <div>
              <span className="eyebrow">KEEP EXPLORING</span>
              <Link href={`/projects/${nextProject.id}/`}>
                {nextProject.title}
                <ArrowIcon diagonal />
              </Link>
            </div>
            <Link className="text-link" href="/projects/">
              一覧に戻る <ArrowIcon />
            </Link>
          </nav>
        </article>
      </SiteShell>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projects.map((project) => ({ params: { id: project.id } })),
  fallback: false,
});
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const index = projects.findIndex((project) => project.id === params?.id);
  if (index < 0) return { notFound: true };
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return {
    props: {
      project,
      content: await getProjectHtml(project.id),
      nextProject: { id: next.id, title: next.title },
    },
  };
};
