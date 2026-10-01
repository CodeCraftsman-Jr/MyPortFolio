/**
 * The portfolio content contract, shared by the public site, the admin UI,
 * the API and the MCP tools. Each content kind has one Zod schema (what is
 * valid) and one field list (how the admin form shows it), side by side so
 * they cannot drift apart.
 */
import { z } from "zod";

// ---------------------------------------------------------------- building blocks
// Optional text defaults to "", so a form or agent may leave it out.
const line = (max: number) => z.string().trim().max(max).default("");
const needed = (max: number) => z.string().trim().min(1, "Required").max(max);
const link = z.string().trim().max(500).refine((v) => v === "" || /^(https?:\/\/|mailto:|tel:|\/)/.test(v), "Use a full https:// link").default("");
const slug = z.string().trim().min(1).max(60).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Lower-case words joined by dashes");
const words = (max: number, each = 80) => z.array(z.string().trim().min(1).max(each)).max(max).default([]);

export const MARKS = ["orbit", "slices", "dial", "lcd", "iso", "gauge", "pages", "plate"] as const;
export const TONES = ["store", "jj", "traq", "volt", "cook", "ev", "docu", "kitchen"] as const;
export const PROJECT_KINDS = ["web", "mobile", "desktop", "ai", "automation"] as const;

// ---------------------------------------------------------------- site (one record)
const sectionText = z.object({ tag: line(40), title: line(120), lead: line(600) });

export const siteInput = z.object({
  name: needed(80),
  role: needed(120),
  email: z.string().trim().email().max(200),
  phone: line(30),
  place: line(80),
  coords: line(40),
  available: z.boolean().default(true),
  availableText: line(60),
  heroTitle: needed(120),
  heroAccent: line(120),
  heroLead: line(600),
  aboutTitle: line(120),
  aboutText: line(2000),
  portraitUrl: link,
  contactTitle: line(120),
  contactAccent: line(120),
  contactText: line(600),
  sections: z.object({
    expertise: sectionText,
    products: sectionText,
    work: sectionText,
    plan: sectionText,
    about: sectionText,
    contact: sectionText,
  }),
});
export type Site = z.infer<typeof siteInput>;

// ---------------------------------------------------------------- list kinds
export const productInput = z.object({
  slug,
  name: needed(60),
  kind: line(60),
  line: line(120),
  about: line(600),
  points: words(6, 60),
  url: link,
  host: line(120),
  mark: z.enum(MARKS).default("orbit"),
  tone: z.enum(TONES).default("ev"),
});

export const expertiseInput = z.object({
  slug,
  title: needed(80),
  short: line(160),
  detail: line(1200),
  skills: words(10, 40),
  proof: words(6, 60),
});

const tech = z.object({ name: needed(60), description: line(200), category: z.enum(["frontend", "backend", "database", "tools", "api"]).default("tools") });
const challenge = z.object({ title: needed(120), description: line(500), solution: line(500) });
const phase = z.object({ phase: needed(80), duration: line(40), description: line(300) });

export const projectInput = z.object({
  slug,
  title: needed(120),
  shortDescription: line(400),
  fullDescription: line(3000),
  image: link,
  tags: words(8, 40),
  features: words(16, 160),
  technologies: z.array(tech).max(16).default([]),
  challenges: z.array(challenge).max(8).default([]),
  timeline: z.array(phase).max(8).default([]),
  liveUrl: link,
  category: z.enum(PROJECT_KINDS).default("web"),
});

export const journeyInput = z.object({ when: needed(30), title: needed(120), place: line(120), note: line(500) });
export const stackInput = z.object({ label: needed(40), items: words(12, 40) });
export const stepInput = z.object({ title: needed(80), text: line(300) });
export const needInput = z.object({
  slug,
  label: needed(60),
  hint: line(80),
  stack: words(8, 40),
  deliver: words(6, 160),
  proof: words(4, 60),
  weight: z.number().int().min(1).max(5).default(1),
});
export const socialInput = z.object({ label: needed(40), url: link });

export const KINDS = {
  products: productInput,
  expertise: expertiseInput,
  projects: projectInput,
  journey: journeyInput,
  stack: stackInput,
  process: stepInput,
  needs: needInput,
  socials: socialInput,
} as const;

export type Kind = keyof typeof KINDS;
export const KIND_NAMES = Object.keys(KINDS) as Kind[];
export const isKind = (value: string): value is Kind => value in KINDS;

export type Product = z.infer<typeof productInput>;
export type Expertise = z.infer<typeof expertiseInput>;
export type Project = z.infer<typeof projectInput>;
export type JourneyStop = z.infer<typeof journeyInput>;
export type StackGroup = z.infer<typeof stackInput>;
export type Step = z.infer<typeof stepInput>;
export type Need = z.infer<typeof needInput>;
export type Social = z.infer<typeof socialInput>;

export interface ItemDto<T = Record<string, unknown>> {
  id: number;
  kind: Kind;
  sortOrder: number;
  published: boolean;
  data: T;
  updatedAt: string;
}

/** Everything the public site needs in one response. */
export interface PublicContent {
  site: Site;
  products: Product[];
  expertise: Expertise[];
  projects: Project[];
  journey: JourneyStop[];
  stack: StackGroup[];
  process: Step[];
  needs: Need[];
  socials: Social[];
}

export const itemWrite = z.object({ published: z.boolean().optional(), data: z.record(z.unknown()) });
export const orderInput = z.object({ ids: z.array(z.number().int().positive()).min(1).max(500) });
export const agentKeyInput = z.object({ name: needed(80) });

// ---------------------------------------------------------------- admin form fields
export type FieldType = "text" | "area" | "url" | "words" | "toggle" | "number" | "choice" | "products" | "rows";
export interface Field {
  key: string;
  label: string;
  type: FieldType;
  hint?: string;
  options?: readonly string[];
  /** For "rows": the columns of each row. */
  columns?: Field[];
}

const f = (key: string, label: string, type: FieldType, more: Partial<Field> = {}): Field => ({ key, label, type, ...more });

export const KIND_INFO: Record<Kind, { label: string; title: (d: Record<string, unknown>) => string; fields: Field[] }> = {
  products: {
    label: "Products",
    title: (d) => String(d.name ?? "Product"),
    fields: [
      f("name", "Name", "text"), f("slug", "Short id", "text", { hint: "Used to link expertise and planner items to this product" }),
      f("kind", "Category", "text"), f("line", "Tagline", "text"), f("about", "Description", "area"),
      f("points", "Highlights", "words"), f("url", "Link", "url"), f("host", "Link text", "text"),
      f("mark", "Icon", "choice", { options: MARKS }), f("tone", "Colour", "choice", { options: TONES }),
    ],
  },
  expertise: {
    label: "Expertise",
    title: (d) => String(d.title ?? "Area"),
    fields: [
      f("title", "Title", "text"), f("slug", "Short id", "text"), f("short", "One-line summary", "text"),
      f("detail", "Explanation", "area"), f("skills", "Skills used", "words"), f("proof", "Proven in", "products"),
    ],
  },
  projects: {
    label: "Client work",
    title: (d) => String(d.title ?? "Project"),
    fields: [
      f("title", "Title", "text"), f("slug", "Short id", "text"), f("category", "Type", "choice", { options: PROJECT_KINDS }),
      f("shortDescription", "Card summary", "area"), f("fullDescription", "Full description", "area"),
      f("image", "Image link", "url", { hint: "Upload in Media, then paste the link" }), f("liveUrl", "Live link (optional)", "url"),
      f("tags", "Tags", "words"), f("features", "Features", "words"),
      f("technologies", "Built with", "rows", { columns: [f("name", "Name", "text"), f("description", "What it did", "text"), f("category", "Area", "choice", { options: ["frontend", "backend", "database", "tools", "api"] })] }),
      f("challenges", "Challenges", "rows", { columns: [f("title", "Challenge", "text"), f("description", "Problem", "area"), f("solution", "Solution", "area")] }),
      f("timeline", "Timeline", "rows", { columns: [f("phase", "Phase", "text"), f("duration", "Duration", "text"), f("description", "Notes", "text")] }),
    ],
  },
  journey: {
    label: "Journey",
    title: (d) => String(d.title ?? "Stop"),
    fields: [f("title", "Title", "text"), f("when", "When", "text"), f("place", "Where", "text"), f("note", "Note", "area")],
  },
  stack: {
    label: "Stack",
    title: (d) => String(d.label ?? "Group"),
    fields: [f("label", "Group name", "text"), f("items", "Tools", "words")],
  },
  process: {
    label: "Process",
    title: (d) => String(d.title ?? "Step"),
    fields: [f("title", "Step", "text"), f("text", "What happens", "area")],
  },
  needs: {
    label: "Planner options",
    title: (d) => String(d.label ?? "Option"),
    fields: [
      f("label", "Option", "text"), f("slug", "Short id", "text"), f("hint", "Hint", "text"),
      f("stack", "Suggested stack", "words"), f("deliver", "First version includes", "words"),
      f("proof", "Similar live work", "products"), f("weight", "Size (1-5)", "number"),
    ],
  },
  socials: {
    label: "Links",
    title: (d) => String(d.label ?? "Link"),
    fields: [f("label", "Label", "text"), f("url", "Link", "url")],
  },
};

const sectionFields = (key: string, label: string): Field[] => [
  f(`sections.${key}.tag`, `${label}: label`, "text"),
  f(`sections.${key}.title`, `${label}: heading`, "text"),
  f(`sections.${key}.lead`, `${label}: intro`, "area"),
];

export const SITE_GROUPS: { id: string; label: string; fields: Field[] }[] = [
  {
    id: "profile",
    label: "Profile",
    fields: [
      f("name", "Name", "text"), f("role", "Role line", "text"), f("email", "Email", "text"), f("phone", "Phone", "text"),
      f("place", "Location", "text"), f("coords", "Coordinates", "text"), f("available", "Taking new projects", "toggle"),
      f("availableText", "Availability text", "text"), f("portraitUrl", "Portrait image link", "url"),
    ],
  },
  {
    id: "hero",
    label: "Hero",
    fields: [f("heroTitle", "Headline", "text"), f("heroAccent", "Headline accent", "text"), f("heroLead", "Intro", "area")],
  },
  {
    id: "about",
    label: "About + contact",
    fields: [
      f("aboutTitle", "About heading", "text"), f("aboutText", "About text", "area"),
      f("contactTitle", "Contact heading", "text"), f("contactAccent", "Contact accent", "text"), f("contactText", "Contact text", "area"),
    ],
  },
  {
    id: "sections",
    label: "Section headings",
    fields: [
      ...sectionFields("expertise", "Expertise"), ...sectionFields("products", "Products"), ...sectionFields("work", "Client work"),
      ...sectionFields("plan", "Planner"), ...sectionFields("about", "About"), ...sectionFields("contact", "Contact"),
    ],
  },
];
