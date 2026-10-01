import { useSyncExternalStore } from "react";

export const sections = [
  { id: "home", label: "Home", stage: 0 },
  { id: "apps", label: "Apps", stage: 1 },
  { id: "work", label: "Builds", stage: 2 },
  { id: "journey", label: "Journey", stage: 3 },
  { id: "stack", label: "Stack", stage: 3 },
  { id: "beyond", label: "Off-screen", stage: 0 },
  { id: "contact", label: "Contact", stage: 4 },
] as const;

export type SectionId = (typeof sections)[number]["id"];

let active: SectionId = "home";
const listeners = new Set<() => void>();

export function setActive(id: SectionId) {
  if (active === id) return;
  active = id;
  listeners.forEach((tell) => tell());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function useActiveSection(): SectionId {
  return useSyncExternalStore(subscribe, () => active, () => "home");
}
