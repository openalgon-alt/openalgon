import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    sitemap({
      hostname: "https://openalgon.com",
      dynamicRoutes: [
        "/",
        "/services",
        "/industries",
        "/resources",
        "/pricing",
        "/company",
        "/careers",
        "/contact",
        "/enquire",
        "/admin"
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
