var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var ip_address = "localhost";
var port = 5050;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(port, ip_address, function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at ' + ip_address + ':' + port);
});
