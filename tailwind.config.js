const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                contrast: "#10A37F",
                light: "#dffff7",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            animation: {
                vanish: "vanish 1s ease-out normal forwards",
            },
            keyframes: {
                vanish: {
                    from: {
                        opacity: "100%",
                    },
                    to: {
                        transform: "translate(100px, -999px)",
                        zIndex: "30",
                        opacity: "0%",
                    },
                },
            },
        },
    },
};
