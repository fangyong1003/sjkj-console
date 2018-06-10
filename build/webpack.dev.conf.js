const path = require('path');

var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');


// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // eval-source-map is faster for development
  //devtool: '#eval-source-map',
  //for debug
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),


    //// extract vendor chunks for better caching
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'manifest',
    //  filename: 'vendor.js'
    //}),

    // webpack dllplugin
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(config.dev.dll.manifest)
    }),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['manifest', 'vendor', 'app'],
      chunksSortMode: 'dependency',
      inject: true
    }),
    new AddAssetHtmlPlugin([
      {
        hash: true,
        filepath: path.resolve(__dirname, config.dev.dll.fileName),
        outputPath: path.join(config.dev.dll.outputPath),
        publicPath: path.join(config.dev.dll.publicPath),
        includeSourcemap: true
      }
    ])
  ]
});
