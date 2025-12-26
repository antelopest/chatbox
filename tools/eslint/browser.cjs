const globals = require('globals');

module.exports = {
  files: ['apps/web/**/*.{js,ts,svelte}'],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
};
