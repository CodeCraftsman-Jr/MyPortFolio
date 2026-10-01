import { useSyncExternalStore } from "react";

type QueryStore = {
  subscribe: (onChange: () => void) => () => void;
  getSnapshot: () => boolean;
};

const stores = new Map<string, QueryStore>();

function getStore(query: string): QueryStore {
  const known = stores.get(query);
  if (known) return known;

  const list = typeof window === "undefined" ? null : window.matchMedia(query);
  const store: QueryStore = {
    subscribe: (onChange) => {
      list?.addEventListener("change", onChange);
      return () => list?.removeEventListener("change", onChange);
    },
    getSnapshot: () => list?.matches ?? false,
  };
  stores.set(query, store);
  return store;
}

export function useMediaQuery(query: string): boolean {
  const { subscribe, getSnapshot } = getStore(query);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function useCalmMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function usePhoneSize(): boolean {
  return !useMediaQuery("(min-width: 768px)");
}
