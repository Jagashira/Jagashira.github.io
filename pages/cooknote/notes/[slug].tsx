import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { Seo } from "@/components/portfolio/Seo";
import { getCookNote, getCookNotes } from "@/lib/cooknotes";

interface CookNoteDetailProps {
  note: { slug: string; title: string; html: string };
}

export default function CookNoteDetail({ note }: CookNoteDetailProps) {
  return (
    <SiteShell>
      <Seo
        title={`${note.title} / CookNote`}
        description={`${note.title} — 料理の学びをまとめる CookNote。`}
        path={`/cooknote/notes/${note.slug}/`}
      />
      <article className="container">
        <header className="page-heading">
          <Link className="text-link" href="/cooknote/">
            ← CookNote 一覧
          </Link>
          <p className="eyebrow">FIELD NOTES / COOKNOTE</p>
          <h1>{note.title}</h1>
        </header>
        <div
          className="reading-content section"
          dangerouslySetInnerHTML={{ __html: note.html }}
        />
      </article>
    </SiteShell>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getCookNotes().map((note) => ({ params: { slug: note.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<CookNoteDetailProps> = async ({
  params,
}) => {
  const slug = params?.slug;
  const note = typeof slug === "string" ? await getCookNote(slug) : null;
  if (!note) return { notFound: true };
  return { props: { note } };
};
