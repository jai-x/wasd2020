const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const gfxSrcs = fs.readdirSync(path.join(__dirname, 'src', 'graphics')).map(gfx => ({
  name: gfx,
  entry: path.join(__dirname, 'src', 'graphics', gfx, 'index.js'),
  outputFolder: path.join(__dirname, 'graphics', gfx),
}));

const srcs = gfxSrcs;;

module.exports = srcs.map(src => ({
  entry: src.entry,

  output: { path: src.outputFolder, filename: 'bundle.js' },

  stats: 'minimal',

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({title: `WASD 2020 - ${src.name}`}),
  ],

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader?modules'] },
    ]
  },
}));
