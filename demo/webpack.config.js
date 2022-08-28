const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      react: path.resolve("../node_modules/react"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
};
