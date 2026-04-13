"use client";

import type { MouseEvent } from "react";
import { useEffect, useState } from "react";

const storageKey = "mason-site-theme";
const mediaQuery = "(prefers-color-scheme: dark)";

type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

function readThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const storedValue = window.localStorage.getItem(storageKey);
    if (storedValue === "light" || storedValue === "dark") {
      return storedValue;
    }
  } catch {
    return "system";
  }

  return "system";
}

function resolveTheme(preference: ThemePreference, matchesDark: boolean): ResolvedTheme {
  if (preference === "system") {
    return matchesDark ? "dark" : "light";
  }

  return preference;
}

function applyTheme(preference: ThemePreference, matchesDark: boolean): ResolvedTheme {
  const resolvedTheme = resolveTheme(preference, matchesDark);
  const root = document.documentElement;

  root.dataset.theme = preference;
  root.style.colorScheme = resolvedTheme;

  return resolvedTheme;
}

function persistThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") {
      window.localStorage.removeItem(storageKey);
      return;
    }

    window.localStorage.setItem(storageKey, preference);
  } catch {
    return;
  }
}

function ThemeGlyph({
  resolvedTheme,
  themePreference,
}: {
  resolvedTheme: ResolvedTheme;
  themePreference: ThemePreference;
}) {
  const sunClassName =
    resolvedTheme === "light"
      ? "opacity-100 rotate-0 scale-100"
      : "opacity-0 -rotate-[70deg] scale-[0.68]";
  const moonClassName =
    resolvedTheme === "dark"
      ? "opacity-100 rotate-0 scale-100"
      : "opacity-0 rotate-[55deg] scale-75";

  return (
    <span className="relative block h-5 w-5">
      <svg
        aria-hidden="true"
        className={`absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${sunClassName}`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 2.75V5.25M12 18.75V21.25M21.25 12H18.75M5.25 12H2.75M18.54 5.46L16.77 7.23M7.23 16.77L5.46 18.54M18.54 18.54L16.77 16.77M7.23 7.23L5.46 5.46"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.75"
        />
      </svg>
      <svg
        aria-hidden="true"
        className={`absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${moonClassName}`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M21 12.4A8.5 8.5 0 1 1 11.6 3a6.7 6.7 0 0 0 9.4 9.4Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
      </svg>
      <span
        aria-hidden="true"
        className={`absolute -right-1 -bottom-1 h-1.5 w-1.5 rounded-full bg-current transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          themePreference === "system" ? "opacity-55" : "opacity-0"
        }`}
      />
    </span>
  );
}

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const media = window.matchMedia(mediaQuery);

    const syncTheme = () => {
      const nextPreference = readThemePreference();
      const nextResolvedTheme = applyTheme(nextPreference, media.matches);

      setThemePreference(nextPreference);
      setResolvedTheme(nextResolvedTheme);
      setIsMounted(true);
    };

    syncTheme();
    media.addEventListener("change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      media.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    const media = window.matchMedia(mediaQuery);
    const nextPreference = event.altKey
      ? "system"
      : resolvedTheme === "dark"
        ? "light"
        : "dark";

    persistThemePreference(nextPreference);
    setThemePreference(nextPreference);
    setResolvedTheme(applyTheme(nextPreference, media.matches));
  }

  const nextThemeLabel = resolvedTheme === "dark" ? "light" : "dark";
  const title =
    themePreference === "system"
      ? `Following system theme. Click to switch to ${nextThemeLabel} mode.`
      : `Using ${resolvedTheme} mode. Click to switch to ${nextThemeLabel} mode. Option-click to follow system again.`;

  return (
    <button
      aria-label={title}
      className={`fixed left-6 bottom-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-md transition-[background-color,color,transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent motion-reduce:transition-none md:left-10 md:bottom-10 ${
        isMounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
      }`}
      onClick={handleToggle}
      type="button"
    >
      <span className="sr-only">{title}</span>
      <ThemeGlyph resolvedTheme={resolvedTheme} themePreference={themePreference} />
    </button>
  );
}
