// data/projects.ts
export interface Project {
  id: string;
  title: string;
  image: string;
  tech: string[];
  desc: string;
  demo?: string;
  repo?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "gas-line",
    title: "GAS × LINE 自動フィードバック",
    image: "/projects/gas-line.jpg",
    tech: [
      "Google Apps Script (GAS)",
      "LINE Messaging API",
      "Google Sheets",
      "Google Docs",
    ],
    desc: "Google Form の回答から個別 PDF を生成し、公式 LINE へ自動返信するシステム",
  },
  {
    id: "oto-log",
    title: "Oto-Log",
    image: "/projects/minutes.jpg",
    tech: ["Next.js", "Whisper", "ChatGPT", "Firebase"],
    desc: "音声を文字起こしし、AIが要約まで行う議事録作成サポートアプリ",
  },
  {
    id: "kakei-plus",
    title: "Kakei Plus",
    image: "/projects/kakei-plus.jpg",
    tech: ["Next.js", "Firebase", "ChatGPT"],
    desc: "レシートを撮るだけで品目・金額・カテゴリをAIが自動入力する家計簿アプリ",
  },
  {
    id: "anki-forge",
    title: "Anki Forge",
    image: "/projects/anki.jpg",
    tech: ["Next.js", "AnkiConnect", "Pexels API", "Google TTS", "ChatGPT"],
    desc: "英単語を入力するだけで、意味・例文・音声・画像付きのリッチなAnkiカードを自動生成",
  },
  {
    id: "quick-anki",
    title: "Quick Anki",
    image: "/projects/QuickAnki.png",
    tech: ["Chrome Extension", "React", "TypeScript", "Vite", "ChatGPT"],
    desc: "Webページ上の単語を右クリックするだけで、AIが意味・発音・例文・音声・画像を自動生成し、Ankiにリッチなカードとして登録するChrome拡張機能",
    repo: "https://github.com/Jagashira/Quick-Anki",
    // link: "https://chrome.google.com/webstore/detail/your-extension-id" // 公開後に有効化
  },
  {
    id: "piano-club",
    title: "東京理科大学ピアノの会",
    image: "https://tus-piano.vercel.app/img/og-image.jpg",
    tech: ["Next.js", "Tailwind CSS", "microCMS", "Rive"],
    desc: "静的サイト生成(SSG/ISR)による高速な公開サイトと、管理者のみがアクセスできる多機能なダッシュボードを両立させた公式サイト。",
    link: "https://tus-piano.vercel.app/",
  },
  {
    id: "remotion-shorts",
    title: "Remotion 動画自動生成システム",
    image: "/projects/remotion-shorts.jpg",
    tech: ["Remotion", "FFmpeg", "Whisper", "ChatGPT", "React"],
    desc: "AIによる翻訳・字幕付けと、プログラムによるアニメーション生成を組み合わせた動画自動化ツール",
  },
  {
    id: "ysp-201-serial",
    title: "YSP-201 Serial Communication CLI Tool",
    image: "/projects/YSP-201.jpg",
    tech: ["Python", "Serial Communication"],
    desc: "研究室のシリンジポンプ「YSP-201」を、独自のPPL言語より使いやすいコマンドで自動制御するPython CLIツール",
    repo: "https://github.com/Jagashira/Syringe-Pump-Pro",
  },
  {
    id: "ppl-syntax-highlighting",
    title: "vscode-ppl",
    image: "/projects/SyringePump.png",
    tech: ["VSCode", "Syntax Highlighting", "Snippets"],
    desc: "シリンジポンプで使用される独自の言語 PPL のための VSCode 拡張機能。構文ハイライトとスニペットを提供し、プログラミングを効率化。",
    link: "https://marketplace.visualstudio.com/items?itemName=Jagashira.vscode-ppl",
    repo: "https://github.com/Jagashira/vscode-ppl",
  },
];
