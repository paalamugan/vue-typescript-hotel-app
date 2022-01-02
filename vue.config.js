module.exports = {
  chainWebpack(config) {
    config.resolve.alias.delete('@');
    // config.resolve.alias.set('@app', require('path').resolve(__dirname, 'src'));
    config.resolve.plugin('tsconfig-paths').use(require('tsconfig-paths-webpack-plugin'));
  },
};
