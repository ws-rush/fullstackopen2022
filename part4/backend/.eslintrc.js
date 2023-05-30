module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['jest'],
  rules: {
    // here we can override rules specified from the extended configs
    // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
    // for more rules: https://eslint.org/docs/latest/rules/
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { before: true, after: true }
    ],
    'no-console': 0
  }
}
