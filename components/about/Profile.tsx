import React from "react";

const AboutProfile = () => {
  return (
    <>
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* <Image
              src="/me.jpg"
              alt="Profile photo"
              width={160}
              height={160}
              className="rounded-full object-cover"
            /> */}
          <div>
            <h2 className="text-2xl font-bold mb-2">江頭 慧</h2>
            <p className="text-gray-700 mb-4">
              機械工学でロボット技術を学びつつ、独学で Web 開発に挑戦。 将来は
              IoT 領域でハードとソフトを融合したサービス開発を目指しています。
            </p>
            <div className="space-x-4">
              <a
                href="https://github.com/jagashira"
                className="underline text-blue-600"
                target="_blank"
              >
                GitHub
              </a>
              <a
                href="mailto:mail@example.com"
                className="underline text-blue-600"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
};

export default AboutProfile;
