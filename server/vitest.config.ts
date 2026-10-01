import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@shared": path.resolve(__dirname, "../shared") } },
  test: { testTimeout: 30_000, hookTimeout: 60_000, fileParallelism: false },
});
