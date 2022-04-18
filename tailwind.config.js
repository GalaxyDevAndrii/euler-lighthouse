const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            screens: {
                xs: "395px",
                mini: "362px",
            },
            colors: {
                mainLight: "#dffff7",
                contrast: "#10A37F",
                mainDark: "#121212",
                lightDark: "#232325",
                lightGray: "#5a5a5a",
                mainGray: "#383b40",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            animation: {
                wiggle: "wiggle .5s ease infinite",
            },
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
        },
    },
};
