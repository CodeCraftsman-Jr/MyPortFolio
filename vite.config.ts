import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use root path for custom domain (vasanthan.tech)
  // For custom domains, use '/' instead of './'
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Ensure proper module format for GitHub Pages
    target: 'es2015',
    rollupOptions: {
      output: {
        // Use .mjs extension for better GitHub Pages compatibility
        entryFileNames: 'assets/[name]-[hash].mjs',
        chunkFileNames: 'assets/[name]-[hash].mjs',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Ensure proper format for GitHub Pages
        format: 'es',
        // Add explicit exports for better compatibility
        exports: 'named'
      }
    },
    // Ensure proper asset handling
    assetsDir: 'assets',
    // Generate manifest for better asset resolution
    manifest: false
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
