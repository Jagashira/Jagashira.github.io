import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RefObject } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { AnimatePresence } from "framer-motion";

type Props = {
  heroRef?: RefObject<HTMLDivElement | null>; // ← null を許可
  children: React.ReactNode;
};

export default function Layout({ heroRef, children }: Props) {
  const { pathname } = useRouter();
  const isTop = pathname === "/";
  const [showHeader, setShowHeader] = useState(!isTop);

  // Hero を監視して Header ON/OFF
  useEffect(() => {
    if (!isTop || !heroRef?.current) return;

    const io = new IntersectionObserver(
      ([entry]) => setShowHeader(!entry.isIntersecting),
      { threshold: 0 } // 1px でも見えていたら isIntersecting = true
    );
    io.observe(heroRef.current);
    return () => io.disconnect();
  }, [isTop, heroRef]);

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {showHeader && <Header />} {/* フェードインは Header 側で */}
      </AnimatePresence>
      <main>{children}</main>
      <Footer />
    </>
  );
}
