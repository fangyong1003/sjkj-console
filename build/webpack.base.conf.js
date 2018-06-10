var path = require('path')
const webpack = require('webpack')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var os = require('os');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.css'],
    // fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      // 从全局lib中查找
      //'babel-polyfill': 'babel-polyfill/dist/polyfill',
      //'echarts': 'echarts/dist/echarts',
      //'vue$': 'vue/dist/vue',
      //'vuex$': 'vuex/dist/vuex',
      'package': path.resolve(__dirname, '../package.json'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'module': path.resolve(__dirname, '../src/module'),
    }
  },
  resolveLoader: {
    // fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: ['eslint-loader'],
        include: projectRoot,
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        loader: ['eslint-loader'],
        include: projectRoot,
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // loader: 'happypack/loader?id=happyVue'
      },
      {
        test: /\.js$/,
        //loader: 'babel-loader',
        loader: 'happypack/loader?id=happyBabel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  //eslint: {
  //  formatter: require('eslint-friendly-formatter')
  //},
  //vue: {
  //  loaders: utils.cssLoaders({sourceMap: useCssSourceMap}),
  //  postcss: [
  //    require('autoprefixer')({
  //      browsers: ['last 2 versions']
  //    })
  //  ]
  //}

  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: {
        loaders: utils.cssLoaders({
          sourceMap: useCssSourceMap,
          extract: useCssSourceMap
        }),
        postcss: [
          require('autoprefixer')({
            browsers: ['last 4 versions']
          })
        ]
      }
    }),

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    new HappyPack({
      id: 'happyBabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    })
  ]
}
