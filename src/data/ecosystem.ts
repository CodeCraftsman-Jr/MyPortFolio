// Public sites, taken from the Coolify deployments on the VarSys VPS
// (plus the Store, which is served outside Coolify). Admin apps and APIs are left out.

export type ProductMark = "orbit" | "slices" | "dial" | "lcd" | "iso" | "gauge" | "pages" | "plate";

export interface Product {
  id: string;
  name: string;
  line: string;
  about: string;
  points: string[];
  url: string;
  host: string;
  mark: ProductMark;
  tone: string;
  kind: string;
}

export const products: Product[] = [
  {
    id: "store",
    name: "VarSys Store",
    line: "Every VarSys app, in one place.",
    about:
      "The release portal for the whole suite: Android and Windows downloads, always the latest build, with notes, sizes and dates for every release.",
    points: ["Android + Windows builds", "Release notes per version", "One install point"],
    url: "https://store.varsys.co.in",
    host: "store.varsys.co.in",
    mark: "orbit",
    tone: "store",
    kind: "Distribution",
  },
  {
    id: "joint-journey",
    name: "Joint Journey",
    line: "Two wallets. One book.",
    about:
      "One money book for a household: shared expenses and income per person, budgets, receipts, vehicles, loans, statement import and trips.",
    points: ["Per-person shared ledger", "Three access roles", "Web, Android, Windows"],
    url: "https://jointjourney.varsys.co.in",
    host: "jointjourney.varsys.co.in",
    mark: "slices",
    tone: "jj",
    kind: "Household finance",
  },
  {
    id: "traqify",
    name: "TraQify",
    line: "Log the day. Read the year.",
    about:
      "Money, health and routine in one tracker: investments and loans, calorie goals and workouts, habit streaks, and a Focus Hub with Pomodoro.",
    points: ["Investments + statement import", "Habits and streaks", "Google Tasks + GitHub"],
    url: "https://traquify.varsys.co.in/welcome",
    host: "traquify.varsys.co.in",
    mark: "dial",
    tone: "traq",
    kind: "Personal dashboard",
  },
  {
    id: "volttrack",
    name: "VoltTrack",
    line: "Know every unit before the bill does.",
    about:
      "Every electricity meter in one place. Reads bill PDFs automatically, charts usage, handles meter resets and prices by tariff slab.",
    points: ["Bill PDF reading", "Tariff slab pricing", "Web, Android, Windows"],
    url: "https://volttrack.varsys.co.in",
    host: "volttrack.varsys.co.in",
    mark: "lcd",
    tone: "volt",
    kind: "Energy tracking",
  },
  {
    id: "cooksuite",
    name: "CookSuite",
    line: "Know what every plate costs.",
    about:
      "Kitchen costing and operations: stock, recipes, gas and power costs, sales and delivery-app payouts. Built from running a real kitchen.",
    points: ["Recipe + plate costing", "Gas and power per dish", "Delivery payouts"],
    url: "https://cooksuite.varsys.co.in",
    host: "cooksuite.varsys.co.in",
    mark: "iso",
    tone: "cook",
    kind: "Restaurant operations",
  },
  {
    id: "ev-hub",
    name: "EV Hub",
    line: "Ride in. Ride on.",
    about:
      "Service platform for electric scooters and motorcycles: compare workshop prices, book a service, look up error codes and check battery health.",
    points: ["Workshop booking", "Error code lookup", "Parts store + admin app"],
    url: "https://customer.evhub.varsys.co.in",
    host: "customer.evhub.varsys.co.in",
    mark: "gauge",
    tone: "ev",
    kind: "Service marketplace",
  },
  {
    id: "docustore",
    name: "DocuStore",
    line: "Files, kept by team.",
    about:
      "Cloud file storage for teams. Team membership decides access, enforced in the database with PostgreSQL row-level security.",
    points: ["Team-scoped access", "Upload and preview", "Row-level security"],
    url: "https://docustore.varsys.co.in",
    host: "docustore.varsys.co.in",
    mark: "pages",
    tone: "docu",
    kind: "Cloud storage",
  },
  {
    id: "kitchen",
    name: "Vasanth's Kitchen",
    line: "Home-style South Indian breakfast, Kalapet.",
    about:
      "The website of my own restaurant, with menu, offers and orders managed from its own admin. The kitchen behind it runs on CookSuite.",
    points: ["Menu + offers admin", "Swiggy + Zomato", "Runs on CookSuite"],
    url: "https://vasanthskitchen.varsys.co.in",
    host: "vasanthskitchen.varsys.co.in",
    mark: "plate",
    tone: "kitchen",
    kind: "Restaurant website",
  },
];
