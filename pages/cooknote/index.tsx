import type { GetStaticProps } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { Seo } from "@/components/portfolio/Seo";
import octoberPlan from "@/data/cooknote/plan/2025-10";
import { getCookNotes, type CookNoteSummary } from "@/lib/cooknotes";

interface CookNotePageProps {
  notes: CookNoteSummary[];
}

export default function CookNotePage({ notes }: CookNotePageProps) {
  return (
    <SiteShell>
      <Seo
        title="CookNote"
        description="料理の基礎知識と月ごとの学習計画をまとめた、個人の学びのノート。"
        path="/cooknote/"
      />
      <div className="container">
        <header className="page-heading">
          <p className="eyebrow">FIELD NOTES / COOKNOTE</p>
          <h1>料理も、学びながら。</h1>
          <p>
            だしの取り方から日々の実践まで。料理の知識と学習計画を、少しずつ書き留めています。
          </p>
          <Link href="/" className="text-link">
            ポートフォリオに戻る →
          </Link>
        </header>

        <section className="section" aria-labelledby="notes-title">
          <p className="eyebrow">01 / REFERENCE</p>
          <h2 id="notes-title">知識のノート</h2>
          <ul className="note-list">
            {notes.map((note) => (
              <li key={note.slug}>
                <Link
                  className="text-link"
                  href={`/cooknote/notes/${note.slug}/`}
                >
                  {note.title} →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="section reading-content"
          aria-labelledby="plan-title"
        >
          <p className="eyebrow">02 / LEARNING PLAN</p>
          <h2 id="plan-title">2025年10月の学習計画</h2>
          <h3>今月のテーマ</h3>
          <ul>
            {octoberPlan.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
          <h3>週ごとの実践</h3>
          <ol className="note-list">
            {octoberPlan.weekly.map((week) => (
              <li key={week.week}>
                <h4>
                  第{week.week}週 · {week.title}
                </h4>
                <p>{week.tasks.join(" / ")}</p>
              </li>
            ))}
          </ol>
          <h3>つくる料理</h3>
          <ul className="note-list">
            {octoberPlan.recipes.map((recipe) => (
              <li key={recipe.id}>
                <h4>{recipe.title}</h4>
                <p>
                  目安 {recipe.timeMin}分 · 難易度 {recipe.level} / 5
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SiteShell>
  );
}

export const getStaticProps: GetStaticProps<CookNotePageProps> = async () => ({
  props: { notes: getCookNotes() },
});
