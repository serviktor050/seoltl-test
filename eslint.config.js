import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            "no-param-reassign": ["error", {
                props: true,
                ignorePropertyModificationsFor: ["state"],
            }],
            "no-shadow": "warn",
            "no-nested-ternary": "warn",
            "prefer-const": "error",
            "no-console": "warn",
            "no-multiple-empty-lines": ["error", { max: 1 }],
            "quotes": ["error", "single"],
            "jsx-quotes": ["error", "prefer-double"],
            "indent": ["warn", 2],
            "max-len": ["error", { code: 120 }],
            "comma-dangle": ["error", "always-multiline"],
            "object-curly-spacing": ["warn", "always"],
            "semi": ["warn", "always"],
        },
    },
)
