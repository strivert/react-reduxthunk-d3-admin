var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://192.168.1.16:5050',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
    watch: true,
    node: {
        // eslint-disable-next-line camelcase
        child_process: "empty",
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty"
    },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel-loader'],
      exclude: /node_modules/,
      include: __dirname
    },
    {
        test: /\.css$/,
        loaders: [
          'style', 'css',
        ],
    }]
  }
};
