import Image from "next/image";
import type { Project } from "@/data/projects/projects";

/** Abstract diagrams communicate a project's purpose, never measured results or a product UI. */
export function ProjectVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  if (project.id === "home-assistant")
    return (
      <div className="project-art art-home">
        <span className="art-label">CONNECTED LIVING</span>
        <Image
          src="/portfolio/home-assistant.jpg"
          alt="Home Assistant・センサー・家電のつながりを描いた既存の概念イラスト"
          width={768}
          height={512}
          priority={priority}
        />
        <span className="art-footnote">CONCEPT ILLUSTRATION</span>
      </div>
    );
  if (project.id === "ysp-201-serial")
    return (
      <div className="project-art art-pump">
        <span className="art-label">CODE MEETS THE PHYSICAL WORLD</span>
        <div className="pump-grid" aria-hidden="true" />
        <Image
          src="/projects/YSP-201.jpg"
          alt="制御対象のシリンジポンプ YSP-201"
          width={350}
          height={350}
        />
        <div className="pump-command" aria-hidden="true">
          <span>Python</span>
          <code>connect → control → repeat</code>
        </div>
        <span className="art-footnote">YSP-201 / SERIAL COMMUNICATION</span>
      </div>
    );
  if (project.id === "clipbridge")
    return (
      <div className="project-art art-bridge">
        <span className="art-label">A BRIDGE BETWEEN DEVICES</span>
        <div className="bridge-diagram" aria-hidden="true">
          <div className="device">
            <div className="clipboard-lines">
              <i />
              <i />
              <i />
            </div>
            <span>macOS</span>
          </div>
          <div className="bridge-connection">
            <span>↔</span>
            <small>SYNC</small>
          </div>
          <div className="device">
            <div className="clipboard-lines">
              <i />
              <i />
              <i />
            </div>
            <span>Windows</span>
          </div>
        </div>
        <span className="art-footnote">CONCEPT DIAGRAM / CLIPBOARD SYNC</span>
      </div>
    );
  if (project.id === "minute-dock" || project.id === "oto-log")
    return (
      <div className="project-art art-audio">
        <span className="art-label">TURN CONVERSATIONS INTO CLARITY</span>
        <div className="audio-diagram" aria-hidden="true">
          <div className="audio-wave">
            {Array.from({ length: 35 }, (_, i) => (
              <i
                key={i}
                style={{
                  height: `${15 + (Math.sin(i * 0.8) + 1) * 24 + (Math.cos(i * 1.9) + 1) * 13}px`,
                }}
              />
            ))}
          </div>
          <div className="audio-paper">
            <span />
            <span />
            <span />
            <div>VOICE → NOTES</div>
          </div>
        </div>
        <span className="art-footnote">CONCEPT DIAGRAM / TRANSCRIPTION</span>
      </div>
    );
  if (project.image.startsWith("/"))
    return (
      <div
        className={`project-art art-existing ${project.id === "quick-anki" ? "art-screenshot" : ""}`}
      >
        <Image
          src={project.image}
          alt={
            project.id === "quick-anki"
              ? "Quick Anki 拡張機能の操作画面"
              : `${project.title} の既存プロジェクト画像`
          }
          width={800}
          height={560}
        />
        <span className="art-footnote">
          {project.id === "quick-anki"
            ? "PRODUCT SCREENSHOT"
            : "PROJECT VISUAL"}
        </span>
      </div>
    );
  return (
    <div className="project-art art-web">
      <span className="art-label">DESIGN & DEVELOPMENT</span>
      <div className="web-diagram" aria-hidden="true">
        <div>● ● ●</div>
        <strong>{project.title}</strong>
        <span />
        <span />
      </div>
      <span className="art-footnote">CONCEPT DIAGRAM / WEB APPLICATION</span>
    </div>
  );
}
