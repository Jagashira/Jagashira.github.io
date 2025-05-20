export interface Project {
  id: string;
  title: string;
  image: string;
  tech: string[];
  desc: string;
  demo?: string; // 任意
  repo?: string; // 任意 ← ここを optional に
}
export const projects: Project[] = [
  {
    id: "gas-line",
    title: "GAS × LINE 自動フィードバック",
    image: "/projects/gas-line.jpg",
    tech: ["GAS", "LINE", "Spreadsheet"],
    desc: "Google Form の回答から個別 PDF を生成し、公式 LINE へ自動返信するシステム。",
  },
  {
    id: "minutes-app",
    title: "議事録アプリ",
    image: "/projects/minutes.jpg",
    tech: ["Next.js", "Whisper", "GPT"],
    desc: "最長 1.5 時間の音声を文字起こしし、ChatGPT で要約まで行う講義・会議向けアプリ。",
  },
  {
    id: "kakeibo",
    title: "家計簿アプリ",
    image: "/projects/kakeibo.jpg",
    tech: ["Next.js", "Firebase"],
    desc: "毎日の収支をスマホで手軽に記録・可視化するシンプル家計簿アプリ。",
  },
  {
    id: "anki-auto",
    title: "Anki 単語カード自動生成アプリ",
    image: "/projects/anki.jpg",
    tech: ["Next.js", "AnkiConnect", "Pexels API", "Google TTS", "ChatGPT"],
    desc: "英単語を入力するだけで、意味・音声・関連画像付きカードを Anki に自動登録。",
  },
  {
    id: "piano-club",
    title: "東京理科大学ピアノの会",
    image: "https://tus-piano.vercel.app/img/icon.png", // リモート画像
    tech: ["Next.js", "Tailwind CSS", "microCMS", "Vercel"],
    desc: "サークルの紹介、定期演奏会情報を掲載。コンテンツは microCMS で一元管理し、Vercel にデプロイしたレスポンシブ公式サイト。",
    demo: "https://tus-piano.vercel.app/",
  },
];
