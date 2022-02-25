module.exports = {
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  targets: {
                    browsers: ["last 2 versions"],
                  },
                },
              ],
            ]
          },
        }
      },
    ],
  }
}