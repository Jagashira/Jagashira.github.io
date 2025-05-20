import React from "react";
import Image from "next/image";

const AboutProfile = () => (
  <section
    className="py-16 px-6 max-w-4xl mx-auto
                      bg-white dark:bg-gray-900"
  >
    <div className="flex flex-col md:flex-row items-center gap-8">
      {/* プロフィール画像（任意） */}
      <Image
        src="/me.jpg"
        alt="Profile photo"
        width={160}
        height={160}
        className="rounded-full object-cover border
                   border-gray-200 dark:border-gray-700"
        priority
      />

      <div>
        <h2
          className="text-2xl font-bold mb-2
                       text-gray-900 dark:text-gray-100"
        >
          江頭 慧
        </h2>

        <p
          className="mb-4 leading-relaxed
                      text-gray-700 dark:text-gray-300"
        >
          機械工学でロボット技術を学びつつ、独学で Web 開発に挑戦。
          将来は&nbsp;IoT&nbsp;領域でハードとソフトを融合したサービス開発を目指しています。
        </p>

        <div className="space-x-4">
          <a
            href="https://github.com/jagashira"
            target="_blank"
            className="underline text-blue-600 dark:text-blue-400"
          >
            GitHub
          </a>
          <a
            href="mailto:mail@example.com"
            className="underline text-blue-600 dark:text-blue-400"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default AboutProfile;
