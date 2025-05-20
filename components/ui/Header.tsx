// components/Header.tsx
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  /** 共通リンク生成関数
   *  mobile=true のときは block ＋ py-2 で縦並び用スタイルを付与
   */
  const navLink = (href: string, label: string, mobile = false) => (
    <Link
      href={href}
      className={`hover:underline ${
        pathname === href
          ? "font-semibold text-blue-600 dark:text-blue-400"
          : "text-gray-800 dark:text-gray-200"
      } ${mobile ? "block py-2" : ""}`}
      onClick={() => setOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-bold text-lg text-gray-900 dark:text-gray-100"
          onClick={() => setOpen(false)}
        >
          MyPortfolio
        </Link>

        {/* PC ナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLink("/", "Home")}
          {navLink("/about", "About")}
          {navLink("/projects", "Projects")}
          <ThemeToggle />
        </nav>

        {/* Mobile ハンバーガー */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Menu</span>
          <div className="w-6 h-0.5 bg-gray-800 dark:bg-gray-100 mb-1" />
          <div className="w-6 h-0.5 bg-gray-800 dark:bg-gray-100 mb-1" />
          <div className="w-6 h-0.5 bg-gray-800 dark:bg-gray-100" />
        </button>
      </div>

      {/* Mobile メニュー */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col bg-white/90 dark:bg-gray-900/90">
          {navLink("/", "Home", true)}
          {navLink("/about", "About", true)}
          {navLink("/projects", "Projects", true)}
          <ThemeToggle />
        </div>
      )}
    </motion.header>
  );
}
