import { serve } from "@hono/node-server";
import { loadSettings } from "./config.js";
import { makePortfolio } from "./portfolio.js";
import { makeApp } from "./app.js";

const settings = loadSettings();
const portfolio = makePortfolio({ settings });
const server = serve({ fetch: makeApp(portfolio).fetch, port: settings.PORT, hostname: "0.0.0.0" }, (info) => {
  console.log(`[portfolio-api] listening on :${info.port} (${settings.NODE_ENV})`);
});

const stop = async () => {
  server.close();
  await portfolio.database.close();
  process.exit(0);
};
process.on("SIGTERM", stop);
process.on("SIGINT", stop);
