import pkg from './package.json';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';

const input = 'src/index.ts';
const plugins = [
  typescript({
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      exclude: ['**/stories/*'],
    },
  }),
];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const commonConfig = {
  input,
  plugins,
  external: ['react', 'react-dom', 'prop-types'],
};

export default defineConfig([
  {
    ...commonConfig,
    output: {
      name: 'useCountLines',
      file: pkg.browser,
      format: 'umd',
      globals,
    },
  },
  {
    ...commonConfig,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
]);
