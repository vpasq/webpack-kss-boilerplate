const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const paths = require('./paths');

module.exports = {
  // Single entry syntax for the entry property
  entry: [paths.src + '/js/index.js'],

  // Output single file into the dist directory.
  output: {
    path: paths.build,
    filename: '[name].bundle.js'
  },

  plugins: [
    // Visualize size of webpack output files with an interactive
    // zoomable treemap.
    // new BundleAnalyzerPlugin(),

    // A webpack plugin to remove/clean your build folder(s).
    new CleanWebpackPlugin(),

    // Copies individual files or entire directories, which already exist,
    // to the build directory.
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
    }),

    // Simplifies creation of HTML files to serve your webpack bundles.
    // This is especially useful for webpack bundles that include a hash
    // in the filename which changes every compilation.
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.src + '/img/favicon.svg',
      template: paths.src + '/html/template.html',
      filename: 'index.html'
    })

    // Automatically lints your source file
    // new ESLintPlugin({
    //   files: ['.', 'src', 'config'],
    //   formatter: 'table',
    // }),
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

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

      { test: /\.(csv|tsv)$/i, use: ['csv-loader'] },

      { test: /\.xml$/i, use: ['xml-loader'] }
    ]
  },

  // Allows you to control how webpack notifies you of assets and
  // entry points that exceed a specific file limit.
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};

