module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'react-app',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        'jsx-a11y/anchor-is-valid': 0,
        '@typescript-eslint/no-var-requires': 0,
    },
};
