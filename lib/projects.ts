import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import { projects } from "@/data/projects/projects";
export async function getProjectHtml(id: string): Promise<string> {
  if (!projects.some((project) => project.id === id))
    throw new Error("Unknown project");
  const source = await fs.readFile(
    path.join(process.cwd(), "data/projects/docs", `${id}.md`),
    "utf8",
  );
  const { content } = matter(source);
  const cleaned = content
    .replace(/^# [^\n]+\n/, "")
    .replace(
      /^(#{2,6})\s+[\p{Extended_Pictographic}\uFE0F\u200D]+\s*/gmu,
      "$1 ",
    );
  return String(await remark().use(gfm).use(html).process(cleaned));
}
