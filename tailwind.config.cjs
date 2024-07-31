/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                mainlight: "#fafafa",
                secondlight: "#d5d5d4",
                select: "#edede8",
                maindark: colors.stone["700"],
            },
            fontFamily: {
                sans: [
                    "Rubik Variable",
                    "IBM Plex Sans Thai Looped",
                    "sans-serif",
                ],
                mono: [
                    "JetBrains Mono Variable",
                    "IBM Plex Sans Thai Looped",
                    "monospace",
                ],
            },
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-5deg)" },
                    "50%": { transform: "rotate(5deg)" },
                },
                "wiggle-small": {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
            animation: {
                wiggle: "wiggle 1s ease-in-out infinite",
                "wiggle-small": "wiggle-small 1s ease-in-out infinite",
            },
        },
    },

    plugins: [require("@tailwindcss/typography")],
};
