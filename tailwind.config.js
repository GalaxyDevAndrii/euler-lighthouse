const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
    theme: {
        extend: {
            screens: {
                xm: "480px",
                xr: "425px",
                xs: "395px",
                mini: "320px",
            },
            colors: {
                primaryText: "#333333",
                secondaryText: "#7D7D7D",

                primaryTheme: "#10A37F",
                primaryThemeDark: "#14725b",
                secondaryTheme: "#5EDBB4",
                tertiaryTheme: "#F1F1F1",
                spot: "#8AA1FF",

                primaryDark: "#121212",
                secondaryDark: "#232325",
                primaryGray: "#383b40",
                secondaryGray: "#5a5a5a",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            animation: {
                wiggle: "wiggle .5s ease infinite",
                dash: "dash 3s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite",
                borealis: "borealisSlide 2s linear infinite",
            },
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
                dash: {
                    to: {
                        strokeDashoffset: "-136",
                    },
                },
                borealisSlide: {
                    "0%": {
                        left: "0%",
                        right: "100%",
                        width: "0%",
                    },
                    "10%": {
                        left: "0%",
                        right: "75%",
                        width: "25%",
                    },
                    "90%": {
                        right: "0%",
                        left: "75%",
                        width: "25%",
                    },
                    "100%": {
                        left: "100%",
                        right: "0%",
                        width: "0%",
                    },
                },
            },
        },
    },
};
