export type ProductMark = "orbit" | "slices" | "dial" | "lcd" | "iso" | "gauge" | "pages";

export interface Product {
  id: string;
  name: string;
  line: string;
  about: string;
  points: string[];
  url?: string;
  host?: string;
  mark: ProductMark;
  tone: string;
}

export const products: Product[] = [
  {
    id: "store",
    name: "VarSys Store",
    line: "Every VarSys app, in one place.",
    about: "The release portal for the whole suite: Android and Windows downloads, always the latest build, with notes, sizes and dates for every release.",
    points: ["Android + Windows builds", "Release notes per version", "One install point"],
    url: "https://store.varsys.co.in",
    host: "store.varsys.co.in",
    mark: "orbit",
    tone: "store",
  },
  {
    id: "joint-journey",
    name: "Joint Journey",
    line: "Two wallets. One book.",
    about: "One money book for a household. Shared expenses and income per person, budgets, receipts, vehicles, loans, statement import and trips.",
    points: ["Per-person shared ledger", "Three access roles", "Web, Android, Windows"],
    url: "https://jointjourney.varsys.co.in",
    host: "jointjourney.varsys.co.in",
    mark: "slices",
    tone: "jj",
  },
  {
    id: "traqify",
    name: "TraQify",
    line: "Log the day. Read the year.",
    about: "Money, health and routine in one tracker: investments and loans, calorie goals and workouts, habit streaks, and a Focus Hub with Pomodoro.",
    points: ["Investments + statement import", "Habits and streaks", "Google Tasks + GitHub"],
    url: "https://traquify.varsys.co.in",
    host: "traquify.varsys.co.in",
    mark: "dial",
    tone: "traq",
  },
  {
    id: "volttrack",
    name: "VoltTrack",
    line: "Know every unit before the bill does.",
    about: "Every electricity meter in one place. Reads bill PDFs automatically, charts usage, handles meter resets and prices by tariff slab.",
    points: ["Bill PDF reading", "Tariff slab pricing", "Web, Android, Windows"],
    url: "https://volttrack.varsys.co.in",
    host: "volttrack.varsys.co.in",
    mark: "lcd",
    tone: "volt",
  },
  {
    id: "cooksuite",
    name: "CookSuite",
    line: "Know what every plate costs.",
    about: "Kitchen costing and operations, built from running a real kitchen: stock, recipes, gas and power costs, sales and delivery-app payouts.",
    points: ["Recipe + plate costing", "Gas and power per dish", "Delivery payouts"],
    url: "https://cooksuite.varsys.co.in",
    host: "cooksuite.varsys.co.in",
    mark: "iso",
    tone: "cook",
  },
  {
    id: "ev-hub",
    name: "EV Hub",
    line: "Ride in. Ride on.",
    about: "Service for electric scooters and motorcycles in India. Compare workshop prices, book a service, look up error codes and check battery health.",
    points: ["Workshop booking", "Error code lookup", "Genuine parts store"],
    url: "https://evhub.varsys.co.in",
    host: "evhub.varsys.co.in",
    mark: "gauge",
    tone: "ev",
  },
  {
    id: "docustore",
    name: "DocuStore",
    line: "Documents, kept by team.",
    about: "Document storage for teams, with access set by team membership. Ships through the VarSys Store with the rest of the suite.",
    points: ["Team-scoped access", "Upload and preview", "Part of the suite"],
    mark: "pages",
    tone: "docu",
  },
];
