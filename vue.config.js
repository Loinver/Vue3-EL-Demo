/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-01-13 10:18:30
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-16 14:41:06
 */
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.baseUrl || './',
  outputDir: process.env.VUE_APP_OUTPUT_DIR || undefined,
  assetsDir: 'static',
  indexPath: 'index.html',
  // 编译警告
  lintOnSave: isProduction,
  configureWebpack: (config) => {
    //添加vscode 网页编辑器
    config.plugins.push(new MonacoWebpackPlugin());
    if (isProduction) {
      // 开启gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[file].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    } else {
      // 开发环境配置
    }
  },
  transpileDependencies: ['element-ui'],
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('apis', resolve('src/apis'))
      .set('utils', resolve('src/utils'));
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    config.when(!isProduction, (config) => {
      const now = new Date();
      const version = [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
        [now.getHours(), now.getMinutes(), now.getSeconds()].join('H'),
      ]
        .join('|')
        .replace(/(?=\b\d\b)/g, ':');
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: `chunk-libs${version}`,
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: `chunk-elementUI${version}`, // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk('single');
    });
  },
  // 反向代理
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    open: false,
    https: false,
    proxy: {
      '/api': {
        target: 'http://11',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  css: {
    requireModuleExtension: true,
  },
};
