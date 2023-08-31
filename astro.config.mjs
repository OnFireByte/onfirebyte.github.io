import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [svelte(), tailwind()],
    markdown: {
        shikiConfig: {
            // Choose from Shiki's built-in themes (or add your own)
            // https://github.com/shikijs/shiki/blob/main/docs/themes.md
            theme: "material-theme-lighter",
            // Add custom languages
            // Note: Shiki has countless langs built-in, including .astro!
            // https://github.com/shikijs/shiki/blob/main/docs/languages.md
            langs: [],
            // Enable word wrap to prevent horizontal scrolling
            wrap: true,
        },
    },
    experimental: {
        assets: true,
    },
});
