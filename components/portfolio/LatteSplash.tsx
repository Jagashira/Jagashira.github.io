import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_KEY = "portfolio-latte-seen-v1";

/** Original, procedural SVG rosetta. The native dialog supplies focus trapping and Escape support. */
export function LatteSplash({ onComplete }: { onComplete: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [leaving, setLeaving] = useState(false);
  const finish = useCallback(() => {
    setLeaving(true);
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* Private browsing must not block entry. */
    }
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      dialog.current?.close();
      onComplete();
    }, 380);
  }, [onComplete]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      /* Intro still works without storage. */
    }
    if (seen || motion.matches) {
      onComplete();
      return;
    }
    dialog.current?.showModal();
    const timer = setTimeout(finish, 3100);
    const handlePreference = () => {
      if (motion.matches) finish();
    };
    motion.addEventListener("change", handlePreference);
    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer.current);
      motion.removeEventListener("change", handlePreference);
    };
  }, [finish, onComplete]);

  return (
    <dialog
      ref={dialog}
      className={`latte-splash ${leaving ? "is-leaving" : ""}`}
      aria-labelledby="intro-title"
      aria-describedby="intro-description"
      onCancel={(event) => {
        event.preventDefault();
        finish();
      }}
    >
      <div className="latte-content" tabIndex={-1}>
        <span className="eyebrow latte-eyebrow">
          A LITTLE CURIOSITY, FRESHLY BREWED.
        </span>
        <svg
          className="latte-cup"
          viewBox="0 0 320 320"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="coffee">
              <stop stopColor="#b88458" />
              <stop offset=".67" stopColor="#9c633e" />
              <stop offset="1" stopColor="#75452b" />
            </radialGradient>
            <radialGradient id="porcelain">
              <stop offset=".6" stopColor="#fff" />
              <stop offset=".84" stopColor="#f2efe8" />
              <stop offset="1" stopColor="#e2dfd7" />
            </radialGradient>
            <filter
              id="cup-shadow"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feDropShadow
                dx="0"
                dy="10"
                stdDeviation="12"
                floodColor="#6b523c"
                floodOpacity=".13"
              />
            </filter>
            <clipPath id="coffee-clip">
              <circle cx="150" cy="155" r="91" />
            </clipPath>
          </defs>
          <g filter="url(#cup-shadow)">
            <circle cx="150" cy="161" r="133" fill="#f8f6f0" />
            <circle cx="150" cy="161" r="113" stroke="#e7e3da" />
            <path
              d="M248 125h20c33 0 33 55 0 55h-20"
              stroke="#e4e0d7"
              strokeWidth="23"
            />
            <path
              d="M247 124h20c29 0 29 54 0 54h-20"
              stroke="#fffefa"
              strokeWidth="15"
            />
            <circle cx="150" cy="155" r="108" fill="url(#porcelain)" />
            <circle cx="150" cy="155" r="95" fill="#c6986c" />
            <circle cx="150" cy="155" r="91" fill="url(#coffee)" />
          </g>
          <g clipPath="url(#coffee-clip)">
            <circle
              className="coffee-ripple ripple-one"
              cx="150"
              cy="156"
              r="36"
              stroke="#e1bc8c"
              strokeWidth="2"
            />
            <circle
              className="coffee-ripple ripple-two"
              cx="150"
              cy="156"
              r="49"
              stroke="#e1bc8c"
              strokeWidth="1.5"
            />
            <path
              className="milk-swirl"
              d="M153 153c-31-20-58 16-36 37 27 24 72-8 67-39-5-36-57-50-78-20"
              pathLength="1"
              stroke="#e8cca2"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <ellipse
              className="milk-bloom"
              cx="150"
              cy="167"
              rx="43"
              ry="42"
              fill="#f0dfbe"
            />
            <g className="rosetta" fill="#fff7e5">
              {Array.from({ length: 7 }, (_, index) => {
                const y = 190 - index * 12;
                const width = 47 - index * 4.5;
                return (
                  <g key={index} className={`latte-leaf leaf-${index}`}>
                    <path
                      d={`M150 ${y + 5} C${150 - width * 0.6} ${y + 5},${150 - width} ${y - 3},${150 - width} ${y - 12} C${150 - width * 0.62} ${y - 7},${150 - width * 0.24} ${y - 5},150 ${y - 7}Z`}
                    />
                    <path
                      d={`M150 ${y + 5} C${150 + width * 0.6} ${y + 5},${150 + width} ${y - 3},${150 + width} ${y - 12} C${150 + width * 0.62} ${y - 7},${150 + width * 0.24} ${y - 5},150 ${y - 7}Z`}
                    />
                  </g>
                );
              })}
              <path
                className="latte-heart"
                d="M150 112C119 91 136 70 150 88C164 70 181 91 150 112Z"
              />
            </g>
            <path
              className="latte-stem"
              d="M150 98c-3 33-2 78 0 114"
              pathLength="1"
              stroke="#fff9e9"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              className="milk-pour"
              d="M150 12v135"
              pathLength="1"
              stroke="#fff8e8"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <h2 id="intro-title">
          Good things take a little care<span>.</span>
        </h2>
        <p id="intro-description">ひとつずつ、丁寧につくる。</p>
        <div className="intro-progress" aria-hidden="true">
          <span />
        </div>
      </div>
      <button className="intro-skip" type="button" onClick={finish}>
        スキップ <span aria-hidden="true">↗</span>
      </button>
    </dialog>
  );
}
