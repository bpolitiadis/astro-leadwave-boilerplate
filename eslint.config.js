import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        browser: true,
        es2022: true,
        node: true,
      },
      globals: {
        process: 'readonly',
        Response: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      // TypeScript handles undefined variables; this rule is noisy with TS types
      'no-undef': 'off',
      // Allow empty catch with explicit comment blocks
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  {
    ignores: ['**/*.astro', '.astro/**/*', 'dist/**/*', 'node_modules/**/*'],
  },
  prettier,
];
