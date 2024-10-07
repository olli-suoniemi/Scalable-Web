import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// UNCOMMENT NEXT LINE FOR PRODUCTION BUILD
import node from "@astrojs/node";

export default defineConfig({
  integrations: [svelte(), tailwind()],
  server: {
    port: 3000,
    host: true
  },
  output: 'server',
  
  // UNCOMMENT NEXT LINE FOR PRODUCTION BUILD
  adapter: node({ mode: 'standalone' }),   // Use Node.js for SSR
});