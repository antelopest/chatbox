const base = require('./tools/eslint/base.cjs');
const node = require('./tools/eslint/node.cjs');
const browser = require('./tools/eslint/browser.cjs');
// const svelte = require('./tools/eslint/svelte.cjs');

const ignores = ['node_modules', 'dist', '**/.svelte-kit/**', '**/build/**'];

module.exports = [
  {
    ignores,
  },
  base,
  node,
  browser,
  // svelte
];
