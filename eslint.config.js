import pluginJs from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import pluginImportX from 'eslint-plugin-import-x';
import globals from 'globals';
import { config, configs as configsTs, parser } from 'typescript-eslint';

export default config(
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,cts,mts,tsx,vue}'],
    languageOptions: { parser },
  },
  pluginJs.configs.recommended,
  ...configsTs.recommended,
  configPrettier,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  {
    settings: {
      'import-x/resolver': { typescript: true, node: true },
    },
    rules: {
      'import-x/order': ['error', { alphabetize: { order: 'asc' } }],
      'import-x/no-deprecated': ['warn'],
    },
  },
  // overrides
  {
    rules: {
      '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'no-console': 'error',
      'prefer-destructuring': 'warn',
      eqeqeq: 'error',
    },
  },

  // Node scripts
  {
    files: [
      'eslint.config.js',
      'rollup*.config.js',
      'scripts/**',
      './*.{js,ts}',
      'packages/*/*.js',
    ],
    languageOptions: { globals: globals.node },
    rules: {
      'no-restricted-globals': 'off',
      'no-console': 'off',
    },
  },

  {
    ignores: ['**/dist/', '**/temp/', '**/coverage/', '.idea/'],
  },
);
