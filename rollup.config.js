import cleaner from 'rollup-plugin-cleaner';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
import packageJSON from './package.json';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJSON.main,
      format: 'cjs',
      sourcemap: !IS_PRODUCTION,
    },
    {
      file: packageJSON.module,
      format: 'es',
      sourcemap: !IS_PRODUCTION,
    },
  ],
  plugins: [
    cleaner({
      targets: ['./lib'],
    }),
    peerDepsExternal(),
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    postcss({
      plugins: [autoprefixer()],
      minimize: IS_PRODUCTION,
      sourceMap: IS_PRODUCTION ? false : 'inline',
      extract: false,
      inject: true,
    }),
    terser(),
  ],
};
