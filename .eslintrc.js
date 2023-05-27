module.exports = {
  root: true,

  env: {
    node: true,
  },
  /*
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended', // we added this line
    'eslint:recommended',
    '@vue/prettier',
  ],*/

  parserOptions: {
    parser: '@babel/eslint-parser',
  },

  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
  },

  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/prettier',
  ],
}
