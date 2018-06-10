// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const fs = require('fs-extra');

const lib = require('./lib.dep.js');
const osUtil = require('../build/osUtil')
const customConfig = require('./superman.json');


let config = {
  common: {
    lib: lib
  },
  build: {
    dll: {
      basePath: '../common/js',
      fileName: '../common/js/lib.js',
      manifest: '../common/js/manifest.json',
      outputPath: './static/js',  // 生成目录
      publicPath: './static/js'   // 注入地址
    },
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPathInCss: '../../',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    dll: {
      basePath: '../common/debug',
      fileName: '../common/debug/lib.js',
      manifest: '../common/debug/manifest.json',
      outputPath: './static/js',  // 生成目录
      publicPath: './static/js'   // 注入地址
    },
    env: require('./dev.env'),
    port: 3000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //'/codi-api': {
      //  target: 'http://121.40.18.21/'
      //},
      //'/codi-portal': {
      //  target: 'http://localhost:8080/'
      //}
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

//custom proxy aha
console.log('node env=', process.env.NODE_ENV || 'development')

if (process.env.NODE_ENV === 'production') {
  console.log('in', process.env.NODE_ENV, 'mode has no proxy.');
} else {
  //function getCustomConfig() {
  //  try {
  //    return fs.readJSONSync(path.join(osUtil.getUserHome(), 'superman.json'));
  //  } catch (e) {
  //    console.error(e);
  //  }
  //  return null;
  //}

  //let customConfig = getCustomConfig()

  console.log('customConfig=', JSON.stringify(customConfig, null, 4));
  if (customConfig && customConfig.proxy) {
    var proxys = customConfig.proxy;
    for (var i = 0; i < proxys.length; i++) {
      var proxy = proxys[i];
      let proxyPath = proxy.path;
      delete  proxy.path;
      config.dev.proxyTable[proxyPath] = proxy;
    }
  }
}


module.exports = config
