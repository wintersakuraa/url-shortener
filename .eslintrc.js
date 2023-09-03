module.exports = {
  extends: ['nestjs', 'plugin:import/errors', 'plugin:import/typescript'],
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@nestjs/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@*/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: './**',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
          '@models': './src/models',
          '@common': './src/common',
          '@configs': './src/configs',
          '@mocks': './mocks',
        },
        extensions: ['.js', '.ts'],
      },
    },
  },
};
