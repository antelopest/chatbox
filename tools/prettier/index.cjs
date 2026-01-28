module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  arrowParens: 'always',

  plugins: ['prettier-plugin-svelte'],

  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss',
      },
    },
  ],
};
