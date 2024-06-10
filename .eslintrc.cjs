module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true    
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
        '@vue/eslint-config-typescript'
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "vue/multi-word-component-names": ["error", {
            "ignores": ["index","Sidebar"]
          }]
    },
    "ignorePatterns": ['README.md']
}
