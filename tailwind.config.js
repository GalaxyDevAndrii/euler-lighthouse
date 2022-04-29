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
                contrast: "#10A37F",
                semiLight: "#C9FBE8",
                mainLight: "#5EDBB4",
                spot: "#8AA1FF",
                mainDark: "#121212",
                mainGray: "#383b40",
                lightDark: "#232325",
                lightGray: "#5a5a5a",
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
