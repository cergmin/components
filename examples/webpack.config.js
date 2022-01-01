const path = require('path');
const process = require('process');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    filename: 'index.js',
    publicPath: './',
    path: path.resolve(__dirname, './build'),
    clean: IS_PRODUCTION,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimization: {
    minimize: IS_PRODUCTION,
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/public/index.html',
      favicon: './src/public/static/favicon.svg',
      minify: IS_PRODUCTION,
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash:6].css',
    }),
    new CssMinimizerPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !IS_PRODUCTION,
            },
          },
        ],
      },
      {
        test: /.(jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:6].[ext]',
              outputPath: '/images',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:6].[ext]',
              outputPath: '/fonts',
            },
          },
        ],
      },
    ],
  },
};
