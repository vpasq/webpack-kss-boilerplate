const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const PrettierPlugin = require('prettier-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
//   .BundleAnalyzerPlugin;
// const webpack = require('webpack');
const paths = require('./config/paths');

module.exports = {
  // Providing the mode configuration option tells webpack to use its
  // built-in optimizations accordingly
  mode: 'production',

  // Controls if and how source maps are generated.
  devtool: 'inline-source-map',

  // Single entry syntax for the entry property
  entry: [paths.src + '/js/index.js'],

  // Output single file into the dist directory
  output: {
    path: paths.build,
    filename: '[name].bundle.js'
  },

  plugins: [
    // Visualize size of webpack output files with an interactive zoomable treemap.
    // new BundleAnalyzerPlugin(),

    // A webpack plugin to remove/clean your build folder(s)..
    new CleanWebpackPlugin(),

    // Copies individual files or entire directories, which already exist, to the build directory.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store']
          },
          noErrorOnMissing: true
        }
      ]
    }),

    // Automatically lints your source files
    // new ESLintPlugin({
    //   files: ['.', 'src', 'config'],
    //   formatter: 'table',
    // }),

    // Automatically process your source files with Prettier when bundling via Webpack.
    // new PrettierPlugin(),

    // extracts CSS into separate files. It creates a CSS file per JS file
    // which contains CSS.
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),

    // Simplifies creation of HTML files to serve your webpack bundles.
    // This is especially useful for webpack bundles that include a hash
    // in the filename which changes every compilation.
    new HtmlWebpackPlugin({
      title: 'webpack-kss-boilerplate',
      favicon: paths.src + '/img/favicon.svg',
      template: paths.src + '/html/template.html',
      filename: 'index.html'
    }),

    // Plugin and Loader to optimize (compress) all images using
    // <a href="https://github.com/imagemin/imagemin">imagemin</a>.
    // Do not worry about size of images, now they are always optimized/compressed.
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false
                }
              ]
            }
          ]
        ]
      }
    })
  ],

  // Babel loader for webpack
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      // Development Loaders:
      // style-loader - Inject CSS into the DOM.
      // css-loader - Interpret @import and url() and resolve them.
      // postcss-loader - Process CSS.
      // sass-loader - Loads a Sass/SCSS file and compiles it to CSS.
      // {
      //   test: /\.s?css$/,
      //   use: [
      //     'style-loader',
      //     {loader: 'css-loader', options: {sourceMap: true,
      //       importLoaders: 2, modules: true }},
      //     { loader: 'postcss-loader', options: {sourceMap: true} },
      //     {loader: 'sass-loader', options: {sourceMap: true}},
      //   ],
      // },

      // Production Loaders:
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
              importLoaders: 2,
              sourceMap: false,
              modules: false
            }
          },
          {
            loader: 'postcss-loader'
          }, 'sass-loader']
      },

      // { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

      { test: /\.(csv|tsv)$/i, use: ['csv-loader'] },

      { test: /\.xml$/i, use: ['xml-loader'] }
    ]
  },

  // Development:
  // webpack-dev-server can be used to quickly develop an application
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: paths.build,
  //   open: true,
  //   compress: true,
  //   hot: true,
  //   port: 8080,
  // },

  // Production:
  // Since version 4 webpack runs optimizations for you depending on the chosen mode,
  // still all optimizations are available for manual configuration and overrides
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // true for production, false for development
        extractComments: true
      }),
      new CssMinimizerPlugin(), '...'
    ],
    runtimeChunk: {
      name: 'runtime'
    }
  },

  // Allows you to control how webpack notifies you of assets and
  // entry points that exceed a specific file limit.
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }

};
