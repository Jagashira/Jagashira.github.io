import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@components/ui/Layout";
import { NextSeo } from "next-seo";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

type NoteFrontmatter = {
  title?: string;
  description?: string;
  tags?: string[];
  updated?: string; // ISO string 推奨
  ogImage?: string; // /public 以下に置く場合 '/og/cooknote.png' など
};

type NoteData = {
  slug: string;
  html: string;
  frontmatter: NoteFrontmatter;
};

type Props = {
  note: NoteData;
};

const NOTES_DIR = path.join(process.cwd(), "data", "cooknote", "notes");

export default function CookNoteDetail({ note }: Props) {
  const title =
    note.frontmatter.title ?? `CookNote: ${note.slug.replace(/-/g, " ")}`;
  const description =
    note.frontmatter.description ??
    "料理の学習ノート（Markdown）を参考書のように整理。";
  const ogImage = note.frontmatter.ogImage
    ? `https://jagashira.github.io${note.frontmatter.ogImage}`
    : undefined;

  return (
    <Layout>
      <NextSeo
        title={`${title} | CookNote`}
        description={description}
        openGraph={{
          title: `${title} | CookNote`,
          description,
          images: ogImage
            ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
            : undefined,
        }}
      />

      <article className="mx-auto max-w-4xl px-6 py-14">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {note.frontmatter.title ?? note.slug}
          </h1>
          {(note.frontmatter.updated || note.frontmatter.tags?.length) && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              {note.frontmatter.updated && (
                <time dateTime={note.frontmatter.updated}>
                  更新:{" "}
                  {new Date(note.frontmatter.updated).toLocaleDateString()}
                </time>
              )}
              {note.frontmatter.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {note.frontmatter.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </header>

        {/* 本文 */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-li:text-gray-700 dark:prose-invert dark:prose-a:text-blue-400"
          dangerouslySetInnerHTML={{ __html: note.html }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const all = fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md") && f !== "index.md");

  const paths = all.map((filename) => ({
    params: { slug: path.basename(filename, ".md") },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(NOTES_DIR, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return { notFound: true };
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);
  const html = processed.toString();

  const frontmatter: NoteFrontmatter = {};

  if (typeof data.title === "string") {
    frontmatter.title = data.title;
  }
  if (typeof data.description === "string") {
    frontmatter.description = data.description;
  }
  if (Array.isArray(data.tags)) {
    frontmatter.tags = data.tags.filter(
      (tag): tag is string => typeof tag === "string"
    );
  }
  if (typeof data.updated === "string") {
    frontmatter.updated = data.updated;
  }
  if (typeof data.ogImage === "string") {
    frontmatter.ogImage = data.ogImage;
  }

  return {
    props: {
      note: { slug, html, frontmatter },
    },
  };
};
