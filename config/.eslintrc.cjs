// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  "env": {
    "browser": true,
    "amd": true,
    "node": true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    "plugin:react-hooks/recommended"
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '../src')],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ["~", path.resolve(__dirname, '../src')],
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-named-as-default": 0,
    "import/no-unresolved": ["error", { "ignore": ["^@/"] }],
    "react/display-name": "off",
    "@typescript-eslint/ban-types": "off",
    "import/named": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off"
  },
};
