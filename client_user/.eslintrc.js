module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:node/recommended"
  ],
  "globals": {
    "BMap": false,
    "moment": false,
    "AMap": false,
    "_":false
  },
  "rules": {
    "camelcase": "warn",
    "quotes": ["error", "single"],
    "indent": ["warn", 2, {
      "SwitchCase": 1
    }],
    "no-unused-vars": "warn",
    "no-console": "off",
    "no-useless-escape": "warn",
    "no-await-in-loop": "off",
    "no-template-curly-in-string": "error",
    "no-whitespace-before-property": "error",
    "arrow-spacing": "error",
    "space-before-blocks": ["warn", {
      "functions": "always",
      "keywords": "always",
      "classes": "always"
    }],
    "space-before-function-paren": ["warn", "never"],
    "space-in-parens": "warn",
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "eqeqeq": "error",
    "semi": ["error", "always"],
    "semi-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "comma-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "object-curly-spacing": ["warn", "always", {
      "objectsInObjects": true
    }],
    "key-spacing": "error",
    "keyword-spacing": "error",
    "vue/html-indent": ["error", 2],
    "node/no-deprecated-api": "warn",
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-extraneous-require": "off",
    "node/no-unpublished-require": "off",
    "no-process-exit": "off"
  }
}
