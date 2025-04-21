import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'
import _import from 'eslint-plugin-import'
import sonarjs from 'eslint-plugin-sonarjs'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  sonarjs.configs.recommended,
  {
    extends: compat.extends('eslint:recommended', 'plugin:prettier/recommended'),

    plugins: {
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      'space-before-function-paren': 0,
      'no-useless-constructor': 0,
      'no-undef': 2,

      'no-console': [
        2,
        {
          allow: ['error', 'warn', 'info', 'assert'],
        },
      ],

      'comma-dangle': ['error', 'only-multiline'],
      'no-unused-vars': 0,
      'no-var': 2,
      'one-var-declaration-per-line': 2,
      'prefer-const': 2,
      'no-const-assign': 2,
      'no-duplicate-imports': 2,

      'no-use-before-define': [
        2,
        {
          functions: false,
          classes: false,
        },
      ],

      eqeqeq: [
        2,
        'always',
        {
          null: 'ignore',
        },
      ],

      'no-case-declarations': 0,

      'no-restricted-syntax': [
        2,
        {
          selector:
            'BinaryExpression[operator=/(==|===|!=|!==)/][left.raw=true], BinaryExpression[operator=/(==|===|!=|!==)/][right.raw=true]',
          message: "Don't compare for equality against boolean literals",
        },
      ],

      'import/no-duplicates': 2,
      'import/first': 2,
      'import/newline-after-import': 2,

      'import/order': [
        2,
        {
          'newlines-between': 'never',

          alphabetize: {
            order: 'asc',
          },

          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        },
      ],

      'sonarjs/cognitive-complexity': 0,
      'sonarjs/no-duplicate-string': 0,
      'sonarjs/no-big-function': 0,
      'sonarjs/no-identical-functions': 0,
      'sonarjs/no-small-switch': 0,
    },
  },
  {
    files: ['./**/*.{ts,tsx}'],

    rules: {
      'no-unused-vars': [
        2,
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ['./**/*{.ts,.tsx}'],

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      'no-undef': 0,
      'no-redeclare': 0,
      'no-useless-constructor': 0,
      'no-unused-vars': 0,
      'no-dupe-class-members': 0,
      'no-case-declarations': 0,
      'no-duplicate-imports': 0,
      'no-use-before-define': 0,
      'no-throw-literal': 2,
      '@typescript-eslint/adjacent-overload-signatures': 2,
      '@typescript-eslint/await-thenable': 2,
      '@typescript-eslint/consistent-type-assertions': 2,

      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            String: {
              message: 'Use string instead',
              fixWith: 'string',
            },

            Number: {
              message: 'Use number instead',
              fixWith: 'number',
            },

            Boolean: {
              message: 'Use boolean instead',
              fixWith: 'boolean',
            },

            Function: {
              message: 'Use explicit type instead',
            },
          },
        },
      ],

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',

          overrides: {
            accessors: 'no-public',
            constructors: 'no-public',
            methods: 'no-public',
            properties: 'no-public',
            parameterProperties: 'explicit',
          },
        },
      ],

      '@typescript-eslint/method-signature-style': 2,
      '@typescript-eslint/no-floating-promises': 2,
      '@typescript-eslint/no-implied-eval': 2,
      '@typescript-eslint/no-for-in-array': 2,
      '@typescript-eslint/no-inferrable-types': 2,
      '@typescript-eslint/no-invalid-void-type': 2,
      '@typescript-eslint/no-misused-new': 2,
      '@typescript-eslint/no-misused-promises': 2,
      '@typescript-eslint/no-namespace': 2,
      '@typescript-eslint/no-non-null-asserted-optional-chain': 2,
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
      '@typescript-eslint/prefer-for-of': 2,
      '@typescript-eslint/prefer-nullish-coalescing': 2,
      '@typescript-eslint/switch-exhaustiveness-check': 2,
      '@typescript-eslint/prefer-optional-chain': 2,
      '@typescript-eslint/prefer-readonly': 2,
      '@typescript-eslint/prefer-string-starts-ends-with': 0,
      '@typescript-eslint/no-array-constructor': 2,
      '@typescript-eslint/require-await': 2,
      '@typescript-eslint/return-await': 2,

      '@typescript-eslint/ban-ts-comment': [
        2,
        {
          'ts-expect-error': false,
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
        },
      ],

      '@typescript-eslint/naming-convention': [
        2,
        {
          selector: 'memberLike',
          format: ['camelCase', 'PascalCase'],
          modifiers: ['private'],
          leadingUnderscore: 'forbid',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        2,
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/member-ordering': [
        2,
        {
          default: [
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'public-constructor',
            'protected-constructor',
            'private-constructor',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
          ],
        },
      ],
    },
  },
])
