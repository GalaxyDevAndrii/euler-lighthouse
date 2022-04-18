module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    parserOptions: { ecmaVersion: 8, sourceType: "module" },
    ignorePatterns: ["node_modules/*"],
    extends: ["eslint:recommended"],
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            parser: "@typescript-eslint/parser",
            settings: {
                react: { version: "detect" },
                "import/resolver": {
                    typescript: {},
                },
            },
            env: {
                browser: true,
                node: true,
                es6: true,
            },
            extends: [
                "eslint:recommended",
                "plugin:import/errors",
                "plugin:import/warnings",
                "plugin:import/typescript",
                "plugin:@typescript-eslint/recommended",
                "plugin:react/recommended",
                "plugin:react-hooks/recommended",
                "plugin:jsx-a11y/recommended",
                "plugin:prettier/recommended",
                "plugin:testing-library/react",
                "plugin:jest-dom/recommended",
            ],
            rules: {
                "no-restricted-imports": [
                    "error",
                    {
                        patterns: ["@/features/*/*"],
                    },
                ],
                "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
                "react/prop-types": "off",
                "no-unused-vars": ["off", { vars: "all", args: "after-used", ignoreRestSiblings: false }],

                "import/order": [
                    "warn",
                    {
                        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
                        "newlines-between": "always",
                        alphabetize: { order: "asc", caseInsensitive: true },
                    },
                ],

                "import/default": "off",
                "import/no-named-as-default-member": "off",
                "import/no-named-as-default": "off",

                "react/react-in-jsx-scope": "off",

                "jsx-a11y/anchor-is-valid": "off",

                "@typescript-eslint/no-unused-vars": ["warn"],

                "@typescript-eslint/explicit-function-return-type": ["off"],
                "@typescript-eslint/explicit-module-boundary-types": ["off"],
                "@typescript-eslint/no-empty-function": ["warn"],
                "@typescript-eslint/no-explicit-any": ["off"],
                "@typescript-eslint/no-var-requires": "warn",

                "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
            },
        },
    ],
};
