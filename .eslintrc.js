module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript'],
  rules: {
    indent: 'off',
    'no-console': 'off',
    '@typescript-eslint/indent': ['error', 2],
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'func-call-spacing': 'off',
    'space-before-function-paren': ['error', 'never'],
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    'no-new': 'off',
    'new-cap': 'off',
    'no-return-assign': 'off',
    'no-prototype-builtins': 'off',
    'unicorn/number-literal-case': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-components': 'off',
    'vue/html-indent': ['error', 2],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
  },
};
