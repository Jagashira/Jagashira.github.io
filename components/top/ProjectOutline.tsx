import React from "react";
import Link from "next/link";
const ProjectOutline = () => {
  return (
    <>
      <section className="py-20 px-6">
        <h2 className="text-2xl font-bold mb-6">制作物ピックアップ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <h3 className="font-semibold">GAS × LINE × スプレッドシート</h3>
            <p className="text-sm text-gray-600 mt-1">
              Google Form → スプレッドシート → PDF生成 →
              公式LINE自動返信までを連携。
            </p>
          </div>
          <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <h3 className="font-semibold">議事録アプリ</h3>
            <p className="text-sm text-gray-600 mt-1">
              Whisper で音声文字起こし＋ChatGPTで要約。講義や会議に最適。
            </p>
          </div>
          <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <h3 className="font-semibold">家計簿アプリ</h3>
            <p className="text-sm text-gray-600 mt-1">
              毎日の収支をシンプルに記録・管理できるモバイル対応家計簿アプリ。
            </p>
          </div>
          <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <h3 className="font-semibold">Anki単語カード自動生成アプリ</h3>
            <p className="text-sm text-gray-600 mt-1">
              英単語を入力するだけで、意味・音声・画像付きカードをAnkiに登録可能。
            </p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/projects" className="text-blue-600 hover:underline">
            もっと見る →
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProjectOutline;
