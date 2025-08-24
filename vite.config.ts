import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use relative base path for GitHub Pages compatibility
  // This works for both custom domains and github.io subdirectories
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Include hash for better caching and unique filenames
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger()
  ].filter(Boolean),
  server: {
    port: 8080,
    strictPort: true,
    headers: {
      "Content-Type": "application/javascript",
      "X-Content-Type-Options": "nosniff"
    }
  }
}));
