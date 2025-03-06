import js from '@eslint/js'
import globals from 'globals'

import esReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      sourceType: "module",
      ecmaVersion: 2020,
    },
  
    plugins: {
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
      'react': esReact,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      ...esReact.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/destructuring-assignment": ["warn", "always", { "ignoreClassFields": true }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      "react/jsx-curly-spacing": ["warn", { "when": "never", "children": true }],
      "space-before-function-paren": ["warn", "never"],
      "@typescript-eslint/no-explicit-any": "warn",
      "object-curly-spacing": ["warn", "always"],
      "react-hooks/exhaustive-deps": 'off',
      'react/react-in-jsx-scope': "off", // Not needed in React 18
      "react/self-closing-comp": "warn",
      "no-trailing-spaces": "warn",
      "semi": ["warn", "always"],
      "react/jsx-key": "warn",
      "no-shadow": "warn",
    },
  },
)