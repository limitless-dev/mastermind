module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  // plugins: ['react', '@typescript-eslint',
  // 'prettier', 'tailwindcss'],
  plugins: ['tailwindcss'],

  rules: {
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'no-use-before-define': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/enforces-shorthand': 'warn',
  },
  ignorePatterns: ['tailwind.config.cjs', 'postcss.config.cjs'],
};
