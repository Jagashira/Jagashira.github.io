import { projects, type Project } from "./projects/projects";

export const profile = {
  name: "Satoshi Egashira",
  japaneseName: "江頭 慧",
  role: "Graduate student / Maker",
  email: "pyprogjas.3104@gmail.com",
  github: "https://github.com/Jagashira",
  introduction:
    "半導体の研究を軸に、IoT、3D Printing、ソフトウェア開発に取り組む大学院生です。仕組みを理解し、自分で設計し、自分でつくり、実際に動かすことを大切にしています。",
};
export type ProjectCategory = "IoT & Hardware" | "Software" | "Automation";
export const categories: ProjectCategory[] = [
  "IoT & Hardware",
  "Software",
  "Automation",
];
export const projectCategories: Record<string, ProjectCategory> = {
  "home-assistant": "IoT & Hardware",
  "ysp-201-serial": "IoT & Hardware",
  "ppl-syntax-highlighting": "IoT & Hardware",
  "gas-line": "Automation",
  "remotion-shorts": "Automation",
  "minute-dock": "Software",
  clipbridge: "Software",
  "oto-log": "Software",
  "kakei-plus": "Software",
  "anki-forge": "Software",
  "quick-anki": "Software",
  "piano-club": "Software",
};
export const featuredProjects: Project[] = [
  "home-assistant",
  "ysp-201-serial",
  "clipbridge",
  "minute-dock",
].map((id) => projects.find((project) => project.id === id)!);
export const projectLabels: Record<string, string> = {
  "home-assistant": "暮らしを、ひとつの仕組みに。",
  "ysp-201-serial": "実験の手順を、コードにする。",
  clipbridge: "端末の境界を、もっとなめらかに。",
  "minute-dock": "会話から、次のアクションへ。",
};
export const skillGroups = [
  {
    number: "01",
    title: "Research & Hardware",
    description: "物理の世界と、デジタルをつなぐ。",
    skills: [
      "半導体研究",
      "3D Printing",
      "Raspberry Pi",
      "ESP32 / ESPHome",
      "シリアル通信",
    ],
  },
  {
    number: "02",
    title: "Software Development",
    description: "使う人のそばで動くものをつくる。",
    skills: [
      "Python",
      "TypeScript",
      "React / Next.js",
      "Tailwind CSS",
      "Git / GitHub",
    ],
  },
  {
    number: "03",
    title: "Data & Automation",
    description: "情報の流れを設計し、手間を減らす。",
    skills: [
      "Whisper API",
      "ChatGPT API",
      "Google Apps Script",
      "Remotion / FFmpeg",
      "REST API",
    ],
  },
  {
    number: "04",
    title: "Infrastructure",
    description: "つくった仕組みを、日常の中で動かす。",
    skills: [
      "Home Assistant",
      "Ubuntu",
      "Firebase",
      "Tailscale",
      "NAS / Immich",
    ],
  },
];
export const experiences = [
  {
    date: "2024.11",
    title: "GAS × LINE 自動返信システム",
    description: "フォーム回答からPDF生成、LINEへの返信までを自動化。",
    href: "/projects/gas-line/",
  },
  {
    date: "2024.02",
    title: "議事録アプリの開発",
    description: "音声の文字起こしと要約を、使いやすい一連の体験へ。",
    href: "/projects/oto-log/",
  },
  {
    date: "2019.04",
    title: "機械工学科に入学",
    description: "ものの仕組みを理解するための学びをスタート。",
  },
];
