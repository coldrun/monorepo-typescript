import { createRequire } from 'module';
import pluginJs from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import pluginImportX from 'eslint-plugin-import-x';
import globals from 'globals';
import { config, configs as configsTs, parser } from 'typescript-eslint';

const pkg = createRequire(import.meta.url)('./package.json');

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
      'import-x/internal-regex': RegExp(`^${pkg.name}.*`),
    },
    rules: {
      'import-x/order': ['error', { alphabetize: { order: 'asc' } }],
      'import-x/no-deprecated': ['warn'],
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
