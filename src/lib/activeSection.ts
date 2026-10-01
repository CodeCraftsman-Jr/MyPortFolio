import { useSyncExternalStore } from "react";

// Page sections in order. `stage` picks the particle shape behind each one.
export const sections = [
  { id: "home", label: "Home", stage: 0 },
  { id: "expertise", label: "Expertise", stage: 1 },
  { id: "products", label: "Products", stage: 2 },
  { id: "work", label: "Client work", stage: 3 },
  { id: "plan", label: "Plan a project", stage: 1 },
  { id: "about", label: "About", stage: 3 },
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
