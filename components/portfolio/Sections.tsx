import Link from "next/link";
import { useState } from "react";
import { experiences, profile, skillGroups } from "@/data/portfolio";
import { ArrowIcon } from "./Icons";

export function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span>{number}</span> {label}
      </p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export function ResearchSection() {
  return (
    <section id="research" className="section research-section">
      <div className="container">
        <SectionHeading
          number="02"
          label="RESEARCH & MAKING"
          title="目に見えない仕組みを、かたちに。"
          description="半導体の小さな世界から、手に取れるものづくりまで。"
        />
        <div className="research-grid">
          <article className="discipline-card">
            <div className="discipline-top">
              <span className="eyebrow">RESEARCH</span>
              <span className="outline-icon" aria-hidden="true">
                ↗
              </span>
            </div>
            <div className="wafer-art" aria-hidden="true">
              <div className="wafer-disc">
                <div />
              </div>
              <span>FROM THE INSIDE OUT</span>
            </div>
            <h3>Semiconductor</h3>
            <p>
              半導体の研究を軸に、技術を仕組みから理解する。微細な世界への探究心を、ハードウェアとソフトウェアをつなぐものづくりへ広げています。
            </p>
            <span className="discipline-note">研究テーマ / 半導体</span>
          </article>
          <article id="making" className="discipline-card">
            <div className="discipline-top">
              <span className="eyebrow">HARDWARE & MAKING</span>
              <span className="outline-icon" aria-hidden="true">
                ↗
              </span>
            </div>
            <div className="print-art" aria-hidden="true">
              <div className="print-object">
                {Array.from({ length: 12 }, (_, i) => (
                  <i
                    key={i}
                    style={{
                      bottom: `${i * 8}px`,
                      width: `${116 + Math.sin(i * 0.35) * 25}px`,
                    }}
                  />
                ))}
              </div>
              <span>FROM AN IDEA TO AN OBJECT</span>
            </div>
            <h3>3D Printing</h3>
            <p>
              考えたことを、実際に触れられるかたちへ。IoTやソフトウェアだけにとどまらず、3Dプリンターを使ったものづくりにも取り組んでいます。
            </p>
            <span className="discipline-note">ものづくり / 3Dプリンター</span>
          </article>
        </div>
        <p className="visual-note">
          図は活動分野を表すオリジナルの抽象表現です。
        </p>
      </div>
    </section>
  );
}

export function AboutSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      id="about"
      className={`section about-section ${standalone ? "about-standalone" : ""}`}
    >
      <div className="container about-grid">
        <div>
          <p className="eyebrow">
            <span>03</span> ABOUT ME
          </p>
          <h2>
            理解する。つくる。
            <br />
            動かして、また考える<span className="blue-text">。</span>
          </h2>
          <div className="signature">
            Satoshi Egashira<span>江頭 慧</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="about-lead">Research × Hardware × Software</p>
          <p>{profile.introduction}</p>
          <p>
            家電やセンサーをつなぐスマートホーム、研究室の装置を制御するツール、日々の作業を助けるアプリ。領域を横断しながら、身近な課題に手を動かして向き合っています。
          </p>
          {!standalone && (
            <Link href="/about/" className="text-link">
              もう少し詳しく <ArrowIcon diagonal />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <SectionHeading
          number="04"
          label="TOOLS & CAPABILITIES"
          title="つくるための、引き出し。"
          description="課題に合わせて、ソフトウェアもハードウェアも。"
        />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-group" key={group.title}>
              <span className="skill-number">{group.number}</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section className="section experience-section">
      <div className="container experience-grid">
        <SectionHeading
          number="05"
          label="EXPERIENCE"
          title="これまでの歩み。"
        />
        <ol className="experience-list">
          {experiences.map((item) => (
            <li key={item.date}>
              <time>{item.date}</time>
              <div>
                <h3>
                  {item.href ? (
                    <Link href={item.href}>
                      {item.title}
                      <ArrowIcon diagonal />
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ContactSection() {
  const [copyMessage, setCopyMessage] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyMessage("メールアドレスをコピーしました");
    } catch {
      setCopyMessage(
        "コピーできませんでした。メールアドレスを選択してコピーしてください。",
      );
    }
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <p className="eyebrow">
          <span>06</span> GET IN TOUCH
        </p>
        <div className="contact-heading">
          <h2>
            次の可能性を、
            <br />
            一緒につくりませんか<span>。</span>
          </h2>
          <a
            className="contact-circle"
            href={`mailto:${profile.email}`}
            aria-label="メールで連絡する"
          >
            <ArrowIcon diagonal />
          </a>
        </div>
        <div className="contact-bottom">
          <p>
            研究、ものづくり、開発のこと。
            <br />
            気軽にお話しできたらうれしいです。
          </p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowIcon diagonal />
            </a>
            <div className="contact-actions">
              <button type="button" onClick={copyEmail}>
                アドレスをコピー
              </button>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub <ArrowIcon diagonal />
              </a>
            </div>
            <p className="copy-status" role="status">
              {copyMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
