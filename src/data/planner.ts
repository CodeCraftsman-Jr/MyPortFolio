// Options for the client project planner. Each need adds stack items,
// first-version deliverables and the live products that show similar work.

export interface Need {
  id: string;
  label: string;
  hint: string;
  stack: string[];
  deliver: string[];
  proof: string[];
  weight: number;
}

export const needs: Need[] = [
  {
    id: "site",
    label: "Website or landing page",
    hint: "Fast, findable, easy to update",
    stack: ["React", "SEO + Open Graph"],
    deliver: ["Responsive site with light and dark themes", "Search and share metadata"],
    proof: ["kitchen", "ev-hub"],
    weight: 1,
  },
  {
    id: "webapp",
    label: "Web app with logins",
    hint: "Accounts, roles, private data",
    stack: ["React + TypeScript", "Node.js API", "PostgreSQL", "Better Auth"],
    deliver: ["Sign-in with roles", "Core screens and data model"],
    proof: ["joint-journey", "docustore"],
    weight: 3,
  },
  {
    id: "mobile",
    label: "Android app",
    hint: "Same product on the phone",
    stack: ["Capacitor Android"],
    deliver: ["Signed Android build", "Release through an update channel"],
    proof: ["store", "volttrack"],
    weight: 2,
  },
  {
    id: "admin",
    label: "Admin dashboard",
    hint: "Run the business from one screen",
    stack: ["Dashboard UI", "Role-based access"],
    deliver: ["Admin panel for records and settings"],
    proof: ["ev-hub", "cooksuite"],
    weight: 2,
  },
  {
    id: "booking",
    label: "Bookings or orders",
    hint: "Customers book or buy online",
    stack: ["Booking flow", "Notifications"],
    deliver: ["Booking or order flow with status tracking"],
    proof: ["ev-hub", "kitchen"],
    weight: 2,
  },
  {
    id: "payments",
    label: "Online payments",
    hint: "RazorPay or Stripe",
    stack: ["RazorPay / Stripe"],
    deliver: ["Checkout with payment confirmation"],
    proof: ["kitchen"],
    weight: 1,
  },
  {
    id: "import",
    label: "Import from PDFs or sheets",
    hint: "Bills, statements, spreadsheets",
    stack: ["PDF + statement parsing"],
    deliver: ["Importer that checks and cleans incoming data"],
    proof: ["volttrack", "traqify"],
    weight: 2,
  },
  {
    id: "hosting",
    label: "Hosting and upkeep",
    hint: "Someone to keep it running",
    stack: ["Docker + Coolify", "Backups"],
    deliver: ["Deployed with backups and monitoring", "Ongoing fixes and updates"],
    proof: ["store", "docustore"],
    weight: 1,
  },
];

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
