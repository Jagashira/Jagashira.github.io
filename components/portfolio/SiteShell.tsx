import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowIcon, Mark } from "./Icons";

const navigation = [
  ["Projects", "/#projects"],
  ["Research", "/#research"],
  ["About", "/#about"],
  ["Skills", "/#skills"],
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  useEffect(() => {
    const close = () => setMenuOpen(false);
    router.events.on("routeChangeStart", close);
    router.events.on("hashChangeStart", close);
    return () => {
      router.events.off("routeChangeStart", close);
      router.events.off("hashChangeStart", close);
    };
  }, [router.events]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        本文へスキップ
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="Satoshi Egashira ホーム">
            <Mark />
            <span>
              Satoshi Egashira<span className="brand-dot">.</span>
            </span>
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /> <span />
          </button>
          <nav
            id="site-navigation"
            className={`site-nav ${menuOpen ? "is-open" : ""}`}
            aria-label="メインナビゲーション"
          >
            {navigation.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <Link
              className="nav-contact"
              href="/#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <ArrowIcon diagonal />
            </Link>
          </nav>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <Link href="/" className="footer-brand">
            <Mark /> Satoshi Egashira
          </Link>
          <p>Made with curiosity. And a little coffee.</p>
          <a
            href="https://github.com/Jagashira"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowIcon diagonal />
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
