import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Three.js into its own chunk
          three: ["three"],
          // Separate React into its own chunk
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    // Generate sourcemaps for production
    sourcemap: false,
    // Minify output (esbuild is default in Vite)
    minify: "esbuild",
  },
});
