/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    // '@vue/eslint-config-prettier/skip-formatting'
    // 'prettier',
    // 'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'max-len': ['error', { 'code': 150 }],
    'comma-dangle': ['error', 'always-multiline'],
    'no-tabs': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1, 'maxBOF': 0 }],
    'padded-blocks': ['error', { 'blocks': 'never', 'classes': 'never', 'switches': 'never' }],
    'no-trailing-spaces': 'error',
    'no-console': 'warn',
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1,
      'ignores': [],
    }],
  },
}
