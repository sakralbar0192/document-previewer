import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import vuejsAccessibility from 'eslint-plugin-vuejs-accessibility'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'

// Vue 3 + Vite globals
const vueGlobals = {
  // Vue Composition API
  ref: 'readonly',
  computed: 'readonly',
  reactive: 'readonly',
  watch: 'readonly',
  watchEffect: 'readonly',
  onMounted: 'readonly',
  onUnmounted: 'readonly',
  onBeforeMount: 'readonly',
  onBeforeUnmount: 'readonly',
  onUpdated: 'readonly',
  onBeforeUpdate: 'readonly',
  nextTick: 'readonly',
  readonly: 'readonly',
  // Vue Router
  useRouter: 'readonly',
  useRoute: 'readonly',
  // Pinia
  useMainStore: 'readonly',
  // Vue i18n
  useI18n: 'readonly',
  // Other
  useCssModule: 'readonly',
  usePerformance: 'readonly',
}

export default [
  // Игнорируемые файлы
  {
    ignores: [
      'node_modules',
      '.nuxt',
      '.output',
      'dist/**/*',
      'build/**/*',
      'coverage/**/*',
      '.nyc_output',
      '.cache',
      '.vscode',
      '.idea',
      '*.min.js',
      'public/mockServiceWorker.js',
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/build/**',
    ],
  },

  // JavaScript/TypeScript файлы
  {
    files: ['**/*.{ts,mts,tsx,js,mjs,cjs}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.browser,
        ...vueGlobals,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // TypeScript правила
      '@typescript-eslint/no-unused-vars': ['error', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Консоль и отладка
      'no-console': 'warn',
      'no-debugger': 'warn',

      // Стиль кода
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'no-tabs': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'key-spacing': ['error'],
      'space-before-function-paren': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'spaced-comment': ['error', 'always'],
      'brace-style': ['error', '1tbs'],
      'comma-spacing': ['error', { before: false, after: true }],
      'func-call-spacing': ['error', 'never'],
      'keyword-spacing': 'error',
      'no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: false }],
      'eol-last': ['error', 'always'],
      'linebreak-style': ['error', 'unix'],

      // Общие правила
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-else-return': 'error',
      'no-lonely-if': 'error',
    },
  },

  // Vitest конфигурация
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  // Playwright конфигурация
  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },

  // Vue файлы
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...vueGlobals,
      },
    },
    plugins: {
      vue,
      'vuejs-accessibility': vuejsAccessibility,
    },
    rules: {
      // Vue правила
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/require-v-for-key': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
      'vue/html-self-closing': ['error', {
        'html': {
          'void': 'always',
          'normal': 'never',
          'component': 'always',
        },
        'svg': 'always',
        'math': 'always',
      }],

      // Accessibility правила
      'vuejs-accessibility/click-events-have-key-events': 'error',
      'vuejs-accessibility/mouse-events-have-key-events': 'error',
      'vuejs-accessibility/alt-text': 'error',
      'vuejs-accessibility/anchor-has-content': 'error',
      'vuejs-accessibility/heading-has-content': 'error',

      // Vue naming правила
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/v-slot-style': ['error', 'shorthand'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],

      // Vue стиль
      'vue/html-indent': ['error', 2],
      'vue/script-indent': ['error', 2],
      'vue/html-quotes': ['error', 'double'],
      'vue/max-attributes-per-line': ['error', {
        'singleline': 3,
        'multiline': 1,
      }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',

      // Запрещаем <style> блоки в компонентах
      'vue/no-restricted-syntax': [
        'error',
        {
          selector: 'VElement[name=style]',
          message: 'Style blocks are not allowed in Vue components. Use separate SCSS files instead.',
        },
      ],
    },
  },
]
