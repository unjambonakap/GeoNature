const webpack = require('webpack');

module.exports = {
  devServer : {
 allowedHosts: [
  'all',
   ],
      disableHostCheck: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
