module.exports = {
    extends: "airbnb",
    plugins: [
        'react',
        'react-hooks',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true,
            classes: true
        }
    },
    rules: {
        linebreak-style: ["error", "windows"],
        indent: ['error', 4],
        'no-trailing-spaces': 'off',
        'padded-blocks': 'off',
        'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
        'implicit-arrow-linebreak': 'off',
        'arrow-parens': ['error', 'as-needed'],
        'class-methods-use-this': 'off',
        'import/no-unresolved': 'off', // FIXME
        'import/prefer-default-export': 'off',
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
        'no-console': 'off',
        'object-curly-newline': 'off',
        'object-property-newline': 'off',
        'no-use-before-define': 'off',
        'no-shadow': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-empty': 'off',
        'no-await-in-loop': 'off',
        'no-underscore-dangle': 'off',
        'jsx-a11y/img-redundant-alt': 'off',
        'max-len': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    }
};