import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { PublicContent } from "@shared/portfolio";
import defaults from "@shared/defaults.json";

export const API_URL = (import.meta.env.VITE_PORTFOLIO_API_URL || "https://portfolio-api.varsys.co.in").replace(/\/$/, "");

const bundled = defaults as unknown as PublicContent;
const Content = createContext<PublicContent>(bundled);

/**
 * The site paints at once from the content bundled at build time, then swaps
 * in the live content from the API. If the API is down, the bundle stays.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PublicContent>(bundled);

  useEffect(() => {
    const stop = new AbortController();
    fetch(`${API_URL}/api/content`, { signal: stop.signal })
      .then((res) => (res.ok ? (res.json() as Promise<PublicContent>) : null))
      .then((live) => {
        if (live?.site) setContent(live);
      })
      .catch(() => undefined);
    return () => stop.abort();
  }, []);

  return <Content.Provider value={content}>{children}</Content.Provider>;
}

export const useContent = () => useContext(Content);
