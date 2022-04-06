module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  env: {
    'react-native/react-native': true, // whitelist all browser-like globals
  },
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts', '.d.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint',
    'simple-import-sort',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'no-use-before-define': 'off', // disable the rule for variables, but enable it for functions and classes
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        'react/jsx-filename-extension': [
          1,
          { extensions: ['js', '.ts', '.tsx'] },
        ],
        'react/prop-types': 'off', // Since we do not use prop-types
        'react/require-default-props': 'off', // Since we do not use prop-types
        'react-native/no-unused-styles': 2, // disallow unused styles
        'react-native/no-inline-styles': 2, // disallow styles declared within the component itself
        'react-native/no-color-literals': 2, // enforces variable names to be used for storing colors
        'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
}
