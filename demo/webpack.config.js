module.exports = {
    entry: "./scripts/main.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    node: { fs: 'empty' },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel",
          query:
            {
              presets:['react']
            }
        }
      ]
    }
};
