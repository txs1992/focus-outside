const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist'),
    publicPath: '/',
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(js|vue)$/,
  //       loader: 'eslint-loader',
  //       enforce: 'pre',
  //       include: [resolve('src')],
  //       options: {
  //         formatter: require('eslint-friendly-formatter'),
  //         emitWarning: true,
  //       },
  //     },
  //     {
  //       test: /\.vue$/,
  //       loader: 'vue-loader',
  //     },
  //     {
  //       test: /\.js$/,
  //       loader: 'babel-loader',
  //       include: [resolve('src')],
  //     },
  //     {
  //       test: /\.(scss|css)$/,
  //       use: ['vue-style-loader', 'css-loader', 'sass-loader'],
  //     },
  //     {
  //       test: /\.(ttf|woff)$/,
  //       use: ['url-loader', 'file-loader'],
  //     },
  //   ],
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {},
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|woff)$/,
        use: ['url-loader', 'file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './examples/'),
      '@packages': path.resolve(__dirname, './packages/'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    port: 8000,
    overlay: true,
    publicPath: '/',
    historyApiFallback: true,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new VueLoaderPlugin(),
  ],
}
