const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const combineLoaders = require('webpack-combine-loaders')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TARGET_ENV = process.env.NODE_ENV || 'development'
const isProd = TARGET_ENV === 'production'

const entryPath = path.join(__dirname, 'client/js/index.js')
const outputPath = path.join(__dirname, 'public')
const outputFilename = isProd ? '[name]-[hash].js' : '[name].js'

console.log(`WEBPACK - Building for ${TARGET_ENV}`)

const common = {
  output: {
    path: outputPath,
    filename: `js/${outputFilename}`
  },
  resolve: {
    extensions: ['.js', '.elm'],
    modules: ['node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/static/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ]
}

if (TARGET_ENV === 'development') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',

    entry: [
      'webpack-hot-middleware/client?reload=true',
      entryPath
    ],

    output: {
      path: outputPath,
      filename: 'js/[name].js',
      publicPath: ''
    },

    module: {
      loaders: [{
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: combineLoaders([
          {
            loader: 'elm-hot-loader'
          },
          {
            loader: 'elm-webpack-loader',
            options: {
              verbose: true,
              warn: true,
              debug: true
            }
          }
        ])
      }]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'developement'
      })
    ]
  })
}
