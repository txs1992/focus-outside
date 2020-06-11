const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const typescript = require('rollup-plugin-typescript')
const terser = require('rollup-plugin-terser').terser

const buildPlugins = [
  resolve({
    browser: true,
  }),
  babel({
    babelrc: true,
    exclude: 'node_modules/**',
  }),
  commonjs(),
  typescript(),
  terser(),
]

async function build(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

const inputOptions = {
  input: 'packages/index.ts',
  plugins: buildPlugins.slice(0, 4),
}

const outputOptions = {
  name: 'FocusOutside',
  file: 'dist/focus-outside.js',
  format: 'umd',
}

const minInputOptions = { ...inputOptions, plugins: buildPlugins }
const minOutputOptions = {
  ...outputOptions,
  file: 'dist/focus-outside.min.js',
}

build(inputOptions, outputOptions)
build(minInputOptions, minOutputOptions)
