import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const KEY = "pf-theme";
const listeners = new Set<() => void>();

function readSaved(): Theme | null {
  try {
    const saved = window.localStorage.getItem(KEY);
    return saved === "dark" || saved === "light" ? saved : null;
  } catch {
    return null;
  }
}

function readTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  return set === "light" ? "light" : "dark";
}

export function startTheme() {
  const saved = readSaved();
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  document.documentElement.dataset.theme = saved ?? (prefersLight ? "light" : "dark");
}

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    window.localStorage.setItem(KEY, next);
  } catch {
    // storage blocked: the choice still applies for this visit
  }
  listeners.forEach((tell) => tell());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "dark");
}
