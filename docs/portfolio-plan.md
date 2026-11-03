# Portfolio redesign

Branch: `feature/portfolio-astra-motion-redesign`

## Direction

New white editorial design, blue accent, generous spacing, a project-first homepage and a consistent project archive/detail system. Existing UI, CSS, layouts and animations are not used. Existing data and Markdown remain the source of project claims.

## Implementation sequence

1. Audit repository, facts and assets; retain Next.js Pages Router, TypeScript and static export.
2. Build new page shell, navigation and information architecture.
3. Create original SVG latte intro with skip, session persistence and reduced-motion support.
4. Create original SVG semiconductor layer assembly with a finite sequence and replay/pause control.
5. Complete project archive/details, research, about/skills/experience/contact, and retain cooking notes in the new shell.
6. Check mobile, keyboard access, reduced motion, links, production build, lint and typecheck; verify in Playwright.

## Content rules

Only verified repository text and the user's supplied biography are used. Unverified candidate projects are omitted. Abstract diagrams are explicitly labeled and are not represented as experimental results or product screenshots. Existing project illustrations can be used with accurate alt text.

## Routes

- `/`: hero, featured projects, research, about, skills, experience and contact.
- `/projects/`: filterable project archive.
- `/projects/[id]/`: static project case studies from existing Markdown.
- `/about/`: biography and detailed skill/experience information.
- Existing `/cooknote/` and `/cooknote/notes/[slug]/`: retained in a matching new reading layout.

## Motion and performance

No new runtime animation or 3D dependencies. SVG/CSS rather than WebGL; finite, controllable animations. Reduced motion shows a static composition without splash. Existing static export is retained for GitHub Pages.
