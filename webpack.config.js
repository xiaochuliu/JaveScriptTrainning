var path = require('path');

module.exports = {
  entry: ['whatwg-fetch', './app/client/index'],

  output: {
    path: path.join(__dirname, 'public/js'),
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
  }
};
