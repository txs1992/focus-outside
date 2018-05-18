import { minify } from 'uglify-es'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    name: 'FocusOutside',
    format: 'umd'
  },
  plugins: [
    eslint({
      throwError: true,
      exclude: 'node_modules/**'
    }),
    resolve({
      extensions: ['.js']
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    uglify({}, minify)
  ]
}
