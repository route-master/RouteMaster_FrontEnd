module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb', // or airbnb-base
    'plugin:react/recommended',
    // 'plugin:import/errors', 설치한 경우
    // 'plugin:import/warnings', // 설치한 경우
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': 1,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    'no-shadow': 0,
    'react/prop-types': 0,
    'no-param-reassign': 0,
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        lableAttributes: ['htmlFor'],
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // personal
    'prettier/prettier': 1,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
