const path = require("path");

module.exports = {
  entry: {
    "my-lib": "./src/index.ts",
    "my-lib.min": "./src/index.ts",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: "source-map",
  mode: "development",
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
