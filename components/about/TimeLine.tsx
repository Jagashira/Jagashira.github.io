import React from "react";

const Timeline = () => (
  <section
    className="py-16 px-6 max-w-3xl mx-auto
               bg-white dark:bg-gray-900"
  >
    <h2
      className="text-2xl font-bold text-center mb-8
                 text-gray-900 dark:text-gray-100"
    >
      Timeline
    </h2>

    <ul className="relative pl-6 space-y-6">
      {/* 縦ライン */}
      <span
        className="absolute left-2 top-0 h-full w-0.5
                   bg-gray-300 dark:bg-gray-600"
      />

      {[
        { date: "2019.04", text: "機械工学科 入学" },
        { date: "2024.02", text: "議事録アプリ (Whisper + ChatGPT) 開発" },
        { date: "2024.11", text: "GAS × LINE 自動返信システム 完成" },
      ].map(({ date, text }) => (
        <li key={date} className="relative">
          {/* ドット */}
          <span
            className="absolute -left-[13px] top-1.5 w-3 h-3 rounded-full
                       bg-blue-600 dark:bg-blue-400"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400">{date}</div>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {text}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

export default Timeline;
