const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                mainLight: "#dffff7",
                contrast: "#10A37F",
                contrastVariant: "#143037",
                mainDark: "#121212",
                lightDark: "#232325",
                lightGray: "#5a5a5a",
                mainGray: "#383b40",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
        },
    },
};
