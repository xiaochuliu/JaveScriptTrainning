var path = require('path');

module.exports = {
  entry: ['whatwg-fetch', './client/index'],

  output: {
    path: path.join(__dirname, 'client', 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'inline-source-map'

};
