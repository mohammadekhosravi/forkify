const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

let mode = process.env.NODE_ENV || "development";


module.exports = {
  mode: mode,

  entry: "./src/js/controller",

  // For outputing images into dist/images nicely.
  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },

  plugins: [
    // At the top
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || "disabled",
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  // There are different option for this but usually this is the best.
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/,
        // This will parse css files in Right to Left order.
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {publicPath: ""},
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ],
      },
    ],
  },

  devServer: {
    // Live reloading and HMR is automatically working.
    // This telling WDS to look at dist folder instead of public.
    static: [
      {
        directory: path.join(__dirname, 'dist'),
      },
    ],
  },
};
