/**
 * Standalone Vite config for the GitHub Pages SPA build.
 * Does NOT use @lovable.dev/vite-tanstack-config or TanStack Start's
 * SSR/Nitro pipeline — produces a plain static bundle in dist/.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  base: "/calvin-querida-s-forever/",
  plugins: [
    // Generate routeTree.gen.ts from file-based routes
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "index.html",
    },
  },
});
