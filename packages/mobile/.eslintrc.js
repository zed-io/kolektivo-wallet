module.exports = {
  extends: ['@valora/eslint-config-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['**/__mocks__/**', '**/lcov-report/**', 'vendor', '.bundle'],
  rules: {
    // Maybe move it to @valora/eslint-config-typescript?
    'jest/valid-title': ['error', { ignoreTypeOfDescribeName: true }],
  },
}
