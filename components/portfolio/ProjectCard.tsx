import Link from "next/link";
import type { Project } from "@/data/projects/projects";
import { projectCategories, projectLabels } from "@/data/portfolio";
import { ArrowIcon } from "./Icons";
import { ProjectVisual } from "./ProjectVisual";
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className="project-card">
      <Link className="project-card-link" href={`/projects/${project.id}/`}>
        <ProjectVisual project={project} />
        <div className="project-card-content">
          <div className="project-meta">
            <span>{projectCategories[project.id]}</span>
            <span className="project-number">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3>
            {project.title}
            <ArrowIcon diagonal />
          </h3>
          {projectLabels[project.id] && (
            <p className="project-tagline">{projectLabels[project.id]}</p>
          )}
          <p className="project-description">{project.desc}</p>
          <ul className="tech-tags" aria-label="使用技術">
            {project.tech.slice(0, 3).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
