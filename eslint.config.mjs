import _import from "eslint-plugin-import";
import preferArrow from "eslint-plugin-prefer-arrow";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import stylisticTs from '@stylistic/eslint-plugin-ts'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules/", "**/dist/", "**/out/", "**/eslint.config.mjs", "coverage/**"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
), {
    plugins: {
        import: fixupPluginRules(_import),
        "prefer-arrow": preferArrow,
        "@typescript-eslint": typescriptEslint,
        '@stylistic/ts': stylisticTs
    },
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.mocha
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
        },
    },

    rules: {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/no-restricted-types": "error",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/consistent-type-definitions": "error",

        "@typescript-eslint/explicit-member-accessibility": ["error", {
            accessibility: "explicit",
        }],
        "@stylistic/ts/indent": ["error", 4, {
            FunctionDeclaration: {
                parameters: "first",
            },

            FunctionExpression: {
                parameters: "first",
            },

            SwitchCase: 1,
        }],
        "@stylistic/ts/member-delimiter-style": ["error", {
            multiline: {
                delimiter: "semi",
                requireLast: true,
            },

            singleline: {
                delimiter: "semi",
                requireLast: false,
            },
        }],

        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@stylistic/ts/quotes": ["error", "single"],
        "@stylistic/ts/semi": ["error", "always"],
        "@typescript-eslint/triple-slash-reference": "error",
        "@stylistic/ts/type-annotation-spacing": "error",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/unified-signatures": "error",
        "arrow-body-style": "error",
        "arrow-parens": ["error", "as-needed"],
        camelcase: "error",
        "comma-dangle": "off",
        complexity: "off",
        "constructor-super": "error",
        curly: "error",
        "dot-notation": "error",
        "eol-last": "error",
        eqeqeq: ["error", "smart"],
        "guard-for-in": "error",
        "id-blacklist": "error",
        "id-match": "error",
        "import/order": "error",
        "linebreak-style": ["error", "unix"],
        "max-classes-per-file": ["error", 1],
        "max-len": "off",
        "new-parens": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-debugger": "error",
        "no-empty": "off",
        "no-eval": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",

        "no-shadow": ["error", {
            hoist: "all",
        }],

        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "off",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "one-var": ["error", "never"],

        "prefer-arrow/prefer-arrow-functions": ["error", {
            allowStandaloneDeclarations: true,
        }],

        "prefer-const": "error",
        "quote-props": ["error", "consistent-as-needed"],
        radix: "error",

        "space-before-function-paren": ["error", {
            anonymous: "never",
            asyncArrow: "always",
            named: "never",
        }],

        "spaced-comment": ["error", "always", {
            block: {
                markers: ["!"],
            },
        }],

        "use-isnan": "error",
        "valid-typeof": "off",
    }
}, {
    files: ["**/*.test.ts"],
    rules: {
        "@typescript-eslint/no-unused-expressions": "off",
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unsafe-call": "off",
    },
}];
