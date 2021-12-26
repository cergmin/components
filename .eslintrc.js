module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'max-len': [
      'warn',
      {
        code: 80,
      },
    ],
    indent: ['error', 2],
    'comma-dangle': ['warn', 'always-multiline'],
    'import/prefer-default-export': ['off'],
    'no-alert': ['off'],
    'no-use-before-define': ['off'],
    'react/prop-types': ['off'],
    'react/display-name': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
