const sveltePlugin = require('eslint-plugin-svelte');
const svelteParser = require('svelte-eslint-parser');
const tsParser = require('@typescript-eslint/parser');

module.exports = {
  files: ['apps/web/**/*.svelte'],
  languageOptions: {
    parser: svelteParser,
    parserOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      extraFileExtensions: ['.svelte'],
    },
  },
  plugins: {
    svelte: sveltePlugin,
  },
  rules: {
    ...(sveltePlugin.configs?.recommended?.rules ?? {}),
  },
};
