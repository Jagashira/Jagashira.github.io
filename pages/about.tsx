import { SiteShell } from "@/components/portfolio/SiteShell";
import { Seo } from "@/components/portfolio/Seo";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  SkillsSection,
} from "@/components/portfolio/Sections";
import Link from "next/link";
import { ArrowIcon } from "@/components/portfolio/Icons";
export default function About() {
  return (
    <>
      <Seo title="About" path="/about/" />
      <SiteShell>
        <div className="container page-heading">
          <Link className="text-link back-link" href="/">
            ← Home
          </Link>
          <p className="eyebrow">THE PERSON BEHIND THE PROJECTS</p>
          <h1>
            Curiosity, put into practice<span>.</span>
          </h1>
          <p>知りたい気持ちを、手を動かす力に。</p>
        </div>
        <AboutSection standalone />
        <SkillsSection />
        <ExperienceSection />
        <section className="section">
          <div className="container side-note">
            <span className="eyebrow">OFF THE WORKBENCH</span>
            <h2>暮らしの中にも、学びを。</h2>
            <p>料理について学んだことも、少しずつ記録しています。</p>
            <Link className="text-link" href="/cooknote/">
              CookNote を読む <ArrowIcon diagonal />
            </Link>
          </div>
        </section>
        <ContactSection />
      </SiteShell>
    </>
  );
}
