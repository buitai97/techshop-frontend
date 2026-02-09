// eslint.config.ts
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import { globalIgnores } from 'eslint/config'


export default [
    globalIgnores(['dist', 'build', 'node_modules', 'coverage', 'public', '**/*.d.ts']),

    {
        files: ['**/*.{ts,tsx}'],

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,

        },

        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': tsPlugin
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            // React 17+ / Vite
            'react/react-in-jsx-scope': 'off',

            // Fast Refresh safety
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                },],
            'no-undef': 'off',
        },
    },
]
