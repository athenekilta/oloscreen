const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: ['./src/js/index.js', './src/scss/main.scss'],
  output: {
    filename: './dist/assets/js/bundle.js'
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
          use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
    ]},
    plugins: [
      new ExtractTextPlugin({ // define where to save the file
        filename: './dist/assets/css/[name].bundle.css',
        allChunks: true,
      }),
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
    ],
    devServer: {
      contentBase: path.join(__dirname, '/dist'),
      compress: true,
      port: 9000,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    }
}
