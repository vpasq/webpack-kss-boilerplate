const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config.common.js');
const paths = require('./paths');

module.exports = merge(common, {
  // Providing the mode configuration option tells webpack to use its
  // built-in optimizations accordingly
  mode: 'development',

  // Controls if and how source maps are generated.
  devtool: 'inline-source-map',

  // webpack-dev-server can be used to quickly develop an application
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080
  },

  module: {
    rules: [
      // style-loader - Inject CSS into the DOM.
      // css-loader - Interpret @import and url() and resolve them.
      // postcss-loader - Process CSS.
      // sass-loader - Loads a Sass/SCSS file and compiles it to CSS.
      {
        test: /\.s?css$/,
        use: [
          // 'style-loader',
          // {
          //   loader: 'css-loader',
          //   options: { sourceMap: false, importLoaders: 2, modules: false }
          // },
          // temp
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false
            }
          },

          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },

  // temp
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      // filename: 'styles/[name].[contenthash].css',
      filename: 'styles/styles.css',
      chunkFilename: '[id].css'
    })
  ]

});
