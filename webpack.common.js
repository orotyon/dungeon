const path = require('path');
module.exports = {
  entry: [ path.join(__dirname, 'src', 'js', 'app.js') ],
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    publicPath: '/js/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  target: ["web", "es5"],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    static: {
        directory: path.join(__dirname, "dist"),
      },
    // contentBase: path.join(__dirname, 'dist'),
    // watchContentBase: true,
    hot: true,
    host: 'localhost',
    port: 8080,
    open: true,
  },
};