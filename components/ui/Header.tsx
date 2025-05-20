import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`hover:underline ${
        pathname === href ? "font-semibold text-blue-600" : ""
      }`}
      onClick={() => setOpen(false)} // クリック後に閉じる
    >
      {label}
    </Link>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur shadow"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-lg">
          MyPortfolio
        </Link>

        {/* PC */}
        <nav className="hidden md:flex space-x-6">
          {navLink("/", "Home")}
          {navLink("/about", "About")}
          {navLink("/projects", "Projects")}
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="sr-only">Menu</span>
          <div className="w-6 h-0.5 bg-gray-800 mb-1" />
          <div className="w-6 h-0.5 bg-gray-800 mb-1" />
          <div className="w-6 h-0.5 bg-gray-800" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLink("/", "Home")}
          {navLink("/about", "About")}
          {navLink("/projects", "Projects")}
        </div>
      )}
    </motion.header>
  );
}
