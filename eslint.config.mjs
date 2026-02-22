import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['eslint.config.mjs', 'coverage/', 'dist/', 'test/json/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/*.d.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig*.json'],
      },
      globals: {
        ...globals.node,
        fetch: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/member-ordering': 'error',
      'no-console': 'error',
      'no-redeclare': 'off',
      'prefer-arrow-callback': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        fetch: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },
];
