/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                mainlight: "#fafafa",
                maindark: colors.stone["700"],
            },
            fontFamily: {
                sans: [
                    "JetBrains Mono Variable",
                    "IBM Plex Sans Thai Looped",
                    "sans-serif",
                ],
                mono: [
                    "JetBrains Mono Variable",
                    "IBM Plex Sans Thai Looped",
                    "monospace",
                ],
            },
        },
    },

    plugins: [require("@tailwindcss/typography")],
};
