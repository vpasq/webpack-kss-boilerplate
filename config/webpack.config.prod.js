const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.common.js');
const paths = require('./paths');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  output: {
    path: paths.build,
    filename: '[name].[contenthash].bundle.js'
  },

  module: {
    rules: [
      // MiniCssExtractPlugin.loader - extracts CSS into separate files.
      // css-loader - Interpret @import and url() and resolve them.
      // postcss-loader - Process CSS.
      // sass-loader - Loads a Sass/SCSS file and compiles it to CSS.
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
              // sourceMap: false,
              // modules: false
            }
          },
          'postcss-loader',
          'sass-loader']
      }
    ]
  },

  plugins: [
    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin
    // is for production
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css'
    })
  ],

  // Since version 4 webpack runs optimizations for you depending on the chosen mode,
  // still all optimizations are available for manual configuration and overrides.
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true
      }),
      new CssMinimizerPlugin()
    ],
    runtimeChunk: {
      name: 'runtime'
    }
  },

  // production
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
});
