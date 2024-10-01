import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  integrations: [svelte(), tailwind()],

  server: {
    port: 3000,
    host: true
  },

  output: 'server',
  adapter: vercel(),
});