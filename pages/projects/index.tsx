import { useRouter } from "next/router";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { Seo } from "@/components/portfolio/Seo";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ContactSection } from "@/components/portfolio/Sections";
import { projects } from "@/data/projects/projects";
import { projectCategories, type ProjectCategory } from "@/data/portfolio";
const filters: { label: string; value: string; category?: ProjectCategory }[] =
  [
    { label: "All projects", value: "all" },
    { label: "IoT & Hardware", value: "hardware", category: "IoT & Hardware" },
    { label: "Software", value: "software", category: "Software" },
    { label: "Automation", value: "automation", category: "Automation" },
  ];
export default function Projects() {
  const router = useRouter();
  const filter =
    filters.find((item) => item.value === router.query.category) ?? filters[0];
  const visibleProjects = filter.category
    ? projects.filter(
        (project) => projectCategories[project.id] === filter.category,
      )
    : projects;
  return (
    <>
      <Seo
        title="Projects"
        path="/projects/"
        description="IoT、ハードウェア制御、ソフトウェア、自動化。江頭慧が取り組んだプロジェクトと、その背景。"
      />
      <SiteShell>
        <section className="container page-heading">
          <p className="eyebrow">THE PROJECT ARCHIVE</p>
          <h1>
            Ideas into things<span>.</span>
          </h1>
          <p>身近な「こうなったらいい」を、動く仕組みに。</p>
          <div className="project-filter-row">
            <div
              className="project-filters"
              role="group"
              aria-label="プロジェクトのカテゴリ"
            >
              {filters.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  aria-pressed={filter.value === item.value}
                  className={filter.value === item.value ? "is-selected" : ""}
                  onClick={() =>
                    router.replace(
                      {
                        pathname: "/projects",
                        query:
                          item.value === "all" ? {} : { category: item.value },
                      },
                      undefined,
                      { shallow: true, scroll: false },
                    )
                  }
                >
                  {item.label}
                  <span>
                    {item.category
                      ? projects.filter(
                          (project) =>
                            projectCategories[project.id] === item.category,
                        ).length
                      : projects.length}
                  </span>
                </button>
              ))}
            </div>
            <span className="result-count" role="status">
              {visibleProjects.length} projects
            </span>
          </div>
        </section>
        <section
          className="container archive-section"
          aria-label="プロジェクト一覧"
        >
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <ProjectCard project={project} index={index} key={project.id} />
            ))}
          </div>
        </section>
        <ContactSection />
      </SiteShell>
    </>
  );
}
