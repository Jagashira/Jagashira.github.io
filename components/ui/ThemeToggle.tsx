// components/ThemeToggle.tsx
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // SSR と hydration ずれ防止
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
