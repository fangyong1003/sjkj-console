var path = require('path')
var os = require('os')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel');


var config = require('../config')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')

var env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : config.build.env

var projectRoot = path.resolve(__dirname, '../')
var customLoaders = utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true}) || [];

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: customLoaders
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  // webpack2 not support custom config prop
  //vue: {
  //  loaders: utils.cssLoaders({
  //    sourceMap: config.build.productionSourceMap,
  //    extract: true
  //  })
  //},
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      },
      sourceMap: false,
      output: {
        comments: false
      }
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // webpack dllplugin
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(config.build.dll.manifest)
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: 'index.html',
      inject: true,
      chunks: ['manifest', 'vendor', 'app'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),

    new AddAssetHtmlPlugin([
      {
        hash: true,
        filepath: path.resolve(__dirname, config.build.dll.fileName),
        outputPath: path.join(config.build.dll.outputPath),
        publicPath: path.join(config.build.dll.publicPath),
        includeSourcemap: false
      }
    ])
  ]
});

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
