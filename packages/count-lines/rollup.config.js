import pkg from './package.json';

export default [
    {
        input: 'main.js',
        output: {
            name: 'countLines',
            file: pkg.browser,
            format: 'umd'
        },
    },
    {
        input: 'main.js',
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ]
    }
];
