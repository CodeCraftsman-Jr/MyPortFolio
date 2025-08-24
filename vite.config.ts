import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  assetsInclude: ['**/*.JPG', '**/*.JPEG'],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2015',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        format: 'es'
      }
    },
    assetsDir: 'assets'
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger()
  ].filter(Boolean),
  server: {
    port: 8080,
    host: '0.0.0.0',
    strictPort: false,
    open: false,
    // Ensure proper MIME type handling
    middlewareMode: false,
    fs: {
      strict: false
    }
  },
  esbuild: {
    target: 'es2015'
  }
}));
