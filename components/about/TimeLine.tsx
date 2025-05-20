import React from "react";

const TimeLine = () => {
  return (
    <>
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Timeline</h2>
        <ul className="border-l-2 border-gray-300 pl-6 space-y-6">
          <li>
            <div className="text-sm text-gray-500">2019.04</div>
            <p className="font-semibold">◉ 機械工学科 入学</p>
          </li>
          <li>
            <div className="text-sm text-gray-500">2024.02</div>
            <p className="font-semibold">
              ◉ 議事録アプリ (Whisper + ChatGPT) 開発
            </p>
          </li>
          <li>
            <div className="text-sm text-gray-500">2024.11</div>
            <p className="font-semibold">◉ GAS × LINE 自動返信システム 完成</p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default TimeLine;
