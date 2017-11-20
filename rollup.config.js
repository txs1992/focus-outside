import { minify } from 'uglify-es'
import uglify from 'rollup-plugin-uglify'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'index.js',
  format: 'cjs',
  dest: 'lib/index.js',
  plugins: [
    eslint({
      throwError: true,
      exclude: 'node_modules/**'
    }),
    resolve({
      extensions: ['.js']
    }),
    uglify({}, minify)
  ]
}
