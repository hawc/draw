module.exports = {
    extends: [
        '@nuxtjs/eslint-config-typescript'
    ],
    rules: {
        "indent": 'off',
        "@typescript-eslint/indent": ["error", 4],
        "semi": "off",
        "@typescript-eslint/semi": ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "func-call-spacing": "off",
        "space-before-function-paren": ["error", "never"],
        "@typescript-eslint/func-call-spacing": ["error", "never"],
        "vue/html-indent": ["error", 4],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "always",
                "normal": "never",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }],
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }]
    }
}