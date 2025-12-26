const globals = require('globals');

module.exports = {
  files: ['apps/api/**/*.{js,ts}'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    'no-console': 'off',
  },
};
