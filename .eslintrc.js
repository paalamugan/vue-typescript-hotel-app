const removeLastStar = (path) => path.replace(/(\/\*)$/, '');

const absolutePath = (path) => {
  return require('path').resolve(__dirname, removeLastStar(path));
};

const webpackResolveAlias = (() => {
  try {
    const result = {};
    const tsConfig = require('./tsconfig.json');
    const { paths } = tsConfig.compilerOptions;

    for (const key in paths) {
      const keyValue = removeLastStar(key);
      let pathValues = paths[key];

      if (pathValues) {
        pathValues = (typeof paths[key] === 'string' ? [pathValues] : pathValues) || [];

        pathValues.forEach((value) => {
          result[keyValue] = absolutePath(value);
        });
      }
    }

    return result;
  } catch {
    return {
      '@app': absolutePath('src'),
    };
  }
})();

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        semi: true,
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'class-methods-use-this': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'], // we want to force semicolons
    indent: ['error', 2], // we use 2 spaces to indent our code
    'no-multi-spaces': ['error'], // we want to avoid extraneous spaces
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: webpackResolveAlias,
          },
        },
      },
    },
  },
};
