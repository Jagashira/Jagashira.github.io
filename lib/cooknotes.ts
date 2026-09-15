import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const notesDirectory = path.join(process.cwd(), "data/cooknote/notes");

export interface CookNoteSummary {
  slug: string;
  title: string;
}

export function getCookNotes(): CookNoteSummary[] {
  return fs
    .readdirSync(notesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = fs.readFileSync(path.join(notesDirectory, file), "utf8");
      const slug = file.replace(/\.md$/, "");
      return { slug, title: source.match(/^#\s+(.+)$/m)?.[1] ?? slug };
    })
    .sort((a, b) =>
      a.slug === "index"
        ? -1
        : b.slug === "index"
          ? 1
          : a.slug.localeCompare(b.slug),
    );
}

export async function getCookNote(slug: string) {
  const notes = getCookNotes();
  const note = notes.find((entry) => entry.slug === slug);
  if (!note) return null;

  const validSlugs = new Set(notes.map((entry) => entry.slug));
  const source = fs.readFileSync(
    path.join(notesDirectory, `${slug}.md`),
    "utf8",
  );
  const body = source
    .replace(/^#\s+.+\r?\n?/, "")
    .split("\n")
    .filter((line) => {
      const target = line.match(
        /^\s*[-*]\s+\[[^\]]+\]\(\.\/([^/]+)\.md\)\s*$/,
      )?.[1];
      return !target || validSlugs.has(target);
    })
    .join("\n")
    .replace(
      /\]\(\.\/([^/]+)\.md\)/g,
      (_, target: string) => `](/cooknote/notes/${target}/)`,
    );
  const result = await remark().use(remarkGfm).use(remarkHtml).process(body);

  return { ...note, html: String(result) };
}
