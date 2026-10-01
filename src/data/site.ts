export const person = {
  name: "Vasanthan E",
  short: "Vasanth",
  role: "Full stack engineer and founder of VarSys",
  email: "dev.vasathan.tech@gmail.com",
  phone: "+91 94424 34269",
  phoneLink: "tel:+919442434269",
  place: "Pondicherry, India",
  coords: "11.94 N  79.81 E",
};

export const socials = [
  { id: "github", label: "GitHub", url: "https://github.com/CodeCraftsman-Jr" },
  { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/vasanthan-e-cse-5556a2327" },
  { id: "leetcode", label: "LeetCode", url: "https://leetcode.com/u/VasanthanVarsys/" },
  { id: "hackerrank", label: "HackerRank", url: "https://www.hackerrank.com/dominicvasanth71" },
  { id: "youtube", label: "YouTube (tech)", url: "https://www.youtube.com/@QUANTUMMOROW/featured" },
];

// Each area of expertise points at live products that prove it.
export const expertise = [
  {
    id: "saas",
    title: "Multi-tenant SaaS",
    short: "Teams, roles and data isolation done in the database.",
    detail:
      "Team-scoped products where one customer can never see another's data. Access rules live in PostgreSQL row-level security, not only in the UI, and sessions come from Better Auth with role-based permissions.",
    skills: ["PostgreSQL RLS", "Better Auth", "Role-based access", "Node.js APIs"],
    proof: ["docustore", "joint-journey", "cooksuite"],
  },
  {
    id: "apps",
    title: "Web + mobile + desktop",
    short: "One codebase shipped to the browser, Android and Windows.",
    detail:
      "React front ends packaged for Android with Capacitor and for Windows, with versioned releases published through my own store. Clients get one product on every device without three separate builds to maintain.",
    skills: ["React + TypeScript", "Capacitor Android", "Windows builds", "Release pipeline"],
    proof: ["store", "joint-journey", "volttrack"],
  },
  {
    id: "data",
    title: "Data products + dashboards",
    short: "Turning statements, bills and logs into decisions.",
    detail:
      "Importers for bank statements and electricity bill PDFs, tariff and costing engines, and dashboards that answer one question each. Charts are built for the data, not dropped in from a template.",
    skills: ["PDF + statement parsing", "Costing logic", "Custom charts", "three.js visuals"],
    proof: ["traqify", "volttrack", "cooksuite"],
  },
  {
    id: "commerce",
    title: "Bookings + commerce",
    short: "Customer sites with ordering, booking and admin.",
    detail:
      "Public sites paired with an admin app: service booking, parts catalogues, menus and offers, and payment integrations with RazorPay and Stripe for client work.",
    skills: ["Booking flows", "Admin panels", "RazorPay / Stripe", "SEO"],
    proof: ["ev-hub", "kitchen"],
  },
  {
    id: "infra",
    title: "Self-hosted infrastructure",
    short: "I deploy and run what I build.",
    detail:
      "Every VarSys product runs on a VPS I operate: Docker containers deployed through Coolify, a private Headscale VPN for database access, secrets in OpenBao, and production PostgreSQL with least-privilege roles.",
    skills: ["Docker + Coolify", "Linux VPS", "Headscale VPN", "OpenBao secrets"],
    proof: ["store", "docustore", "ev-hub"],
  },
];

export const process = [
  {
    id: "listen",
    title: "Understand the work",
    text: "A call to map who uses it, what they do today, and what has to be true on launch day.",
  },
  {
    id: "shape",
    title: "Shape the first version",
    text: "Screens and data model agreed before code, with a fixed first scope you can sign off.",
  },
  {
    id: "build",
    title: "Build in the open",
    text: "Working builds you can click every week, not a reveal at the end.",
  },
  {
    id: "ship",
    title: "Ship and run",
    text: "Deployed on proper infrastructure with backups, then supported and improved after launch.",
  },
];

export const journey = [
  {
    id: "varsys",
    when: "Now",
    title: "Founder, VarSys",
    place: "Pondicherry",
    note: "Eight live products across web, Android and Windows, on infrastructure I run.",
  },
  {
    id: "freelance",
    when: "2023 - now",
    title: "Freelance full stack developer",
    place: "Remote",
    note: "Restaurant ordering, a doctor's booking + store site, and an attention assessment platform with RazorPay.",
  },
  {
    id: "intern",
    when: "2023",
    title: "Python Developer Intern",
    place: "Tech Solutions Pvt Ltd, Pondicherry",
    note: "Inventory system, data dashboard and report generator in three months. Outstanding Intern award.",
  },
  {
    id: "svcet",
    when: "2022 - 2026",
    title: "B.E. Computer Science and Engineering",
    place: "Sri Venkateshwaraa College of Engineering and Technology",
    note: "CGPA 7.5.",
  },
];

export const stackGroups = [
  { id: "lang", label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "C / C++", "Java"] },
  { id: "front", label: "Interface", items: ["React", "Next.js", "Tailwind", "three.js", "Capacitor"] },
  { id: "back", label: "Back end", items: ["Node.js", "PostgreSQL", "Better Auth", "Appwrite", "REST APIs"] },
  { id: "ops", label: "Operations", items: ["Docker", "Coolify", "GitHub Actions", "Linux", "OpenBao"] },
];
