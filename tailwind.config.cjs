/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                mainlight: colors.amber["50"],
                maindark: colors.stone["700"],
            },
        },
    },
    plugins: [],
};
