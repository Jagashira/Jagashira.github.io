import Link from "next/link";
import { useCallback, useState } from "react";
import { Cpu, Layers3, Code2, Radio } from "lucide-react";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { Seo } from "@/components/portfolio/Seo";
import { LatteSplash } from "@/components/portfolio/LatteSplash";
import { SemiconductorScene } from "@/components/portfolio/SemiconductorScene";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ArrowIcon } from "@/components/portfolio/Icons";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  ResearchSection,
  SectionHeading,
  SkillsSection,
} from "@/components/portfolio/Sections";
import { featuredProjects } from "@/data/portfolio";

export default function Home() {
  const [heroActive, setHeroActive] = useState(false);
  const startHero = useCallback(() => setHeroActive(true), []);
  return (
    <>
      <Seo title="Research, build, make it real." />
      <LatteSplash onComplete={startHero} />
      <SiteShell>
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" /> GRADUATE STUDENT & MAKER
            </p>
            <h1 id="hero-title">
              小さな技術を、
              <br />
              暮らしの<span>可能性</span>に。
            </h1>
            <p className="hero-description">
              半導体を研究し、IoTと3Dプリンターでものをつくる。
              <br className="desktop-break" />
              研究と日常をつなぐ、江頭慧のポートフォリオ。
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="#projects">
                プロジェクトを見る <ArrowIcon />
              </Link>
              <Link className="hero-about" href="#about">
                About me <ArrowIcon diagonal />
              </Link>
            </div>
            <p className="hero-motto">
              RESEARCH <span>×</span> HARDWARE <span>×</span> SOFTWARE
            </p>
          </div>
          <div className="hero-visual">
            <SemiconductorScene active={heroActive} />
          </div>
          <div className="hero-bottom">
            <span>Ideas, assembled into reality.</span>
            <a href="#projects">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <div className="discipline-strip">
          <div className="container discipline-strip-inner">
            {[
              {
                n: "01",
                title: "Semiconductor",
                sub: "仕組みを探究する",
                icon: Cpu,
                href: "#research",
              },
              {
                n: "02",
                title: "IoT & Smart Home",
                sub: "暮らしをつなぐ",
                icon: Radio,
                href: "/projects/?category=hardware",
              },
              {
                n: "03",
                title: "3D Printing",
                sub: "アイデアをかたちに",
                icon: Layers3,
                href: "#making",
              },
              {
                n: "04",
                title: "Software",
                sub: "使える体験をつくる",
                icon: Code2,
                href: "/projects/?category=software",
              },
            ].map((item) => (
              <Link key={item.n} href={item.href}>
                <item.icon size={23} strokeWidth={1.4} aria-hidden="true" />
                <div>
                  <span>{item.title}</span>
                  <small>{item.sub}</small>
                </div>
                <span className="discipline-index">{item.n}</span>
              </Link>
            ))}
          </div>
        </div>
        <section id="projects" className="section featured-section">
          <div className="container">
            <div className="section-title-row">
              <SectionHeading
                number="01"
                label="SELECTED WORK"
                title="考えて、つくって、動かしたもの。"
                description="研究室から日々の暮らしまで。課題から生まれたプロジェクト。"
              />
              <Link className="text-link" href="/projects/">
                すべてのプロジェクト <ArrowIcon diagonal />
              </Link>
            </div>
            <div className="project-grid">
              {featuredProjects.map((project, index) => (
                <ProjectCard project={project} index={index} key={project.id} />
              ))}
            </div>
          </div>
        </section>
        <ResearchSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </SiteShell>
    </>
  );
}
