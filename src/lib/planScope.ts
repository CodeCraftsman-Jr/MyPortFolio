// Planner rules that stay in code: who the product is for, and how big it is.

export const audiences = [
  { id: "team", label: "My own team" },
  { id: "customers", label: "My customers" },
  { id: "both", label: "Both" },
];

export function getScope(total: number) {
  if (total <= 2) return { label: "Compact", text: "A focused first release." };
  if (total <= 6) return { label: "Standard", text: "A complete first version, released in stages." };
  return { label: "Extended", text: "A platform, best split into phased releases." };
}

/** A tel: link from a phone number as people write it. */
export const phoneLink = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
