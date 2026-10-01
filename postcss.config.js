import { fileURLToPath } from "node:url";

// Point Tailwind at its config explicitly so the build works from any cwd.
export default {
  plugins: {
    tailwindcss: { config: fileURLToPath(new URL("./tailwind.config.ts", import.meta.url)) },
    autoprefixer: {},
  },
};
