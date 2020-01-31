const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const gfxSrcFolders = ['sixteenNine', 'fourThree', 'bar', 'break'];
const gfxSrcPath = path.join(__dirname, 'src', 'graphics');
const gfxSrcs = gfxSrcFolders.map(gfxSrc => ({
  name: gfxSrc,
  entry: path.join(gfxSrcPath, gfxSrc, 'index.js'),
  outputFolder: path.join(__dirname, 'graphics', gfxSrc),
}));

const srcs = gfxSrcs;

module.exports = srcs.map(src => ({
  entry: src.entry,

  output: { path: src.outputFolder, filename: 'bundle.js' },

  stats: 'errors-warnings',

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({title: `WASD 2020 - ${src.name}`}),
  ],

  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader?modules'] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
      { test: /\.svg$/, loader: 'url-loader' },
      { test: /\.(png|webp|otf|ttf)$/, loader: 'file-loader' },
    ]
  },
}));
