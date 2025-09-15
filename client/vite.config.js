import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react-signature-canvas"], // pré-bundler pour Vercel
  },
  build: {
    outDir: "dist", // s'assure que Vite génère dans dist
  },
});
