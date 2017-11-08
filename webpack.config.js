var webpack = require('webpack');
var isProd = (process.env.NODE_ENV === 'production');

module.exports = [{
  node: {fs: 'empty'},
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
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}, {
  node: {fs: 'empty'},
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: './dist',
    filename: isProd ? 'simplemde-editor.min.js' : 'simplemde-editor.js',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "React", react: "React", "window.react": "React", "window.React": "React"
    }),
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      "react": "src/dummyReact.js"
    }
  },
  externals: {
    // Use external version of React
    "react": "React"
  },
  module: {
    noParse: ["react"],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }

}
];
