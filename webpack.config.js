var webpack = require('webpack');
var isProd = (process.env.NODE_ENV === 'production');

module.exports = {
  node: { fs: 'empty' },
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: './dist',
    filename: isProd ? 'react-simplemde-editor.min.js' : 'react-simplemde-editor.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query:
          {
            presets:['react', 'es2015']
          }
      }
    ]
  }

};
