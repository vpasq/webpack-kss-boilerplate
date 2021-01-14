const path = require('path');

module.exports = {
  // Path to the source code
  src: path.resolve(__dirname, '../src'),

  // Path to files in the build directory
  build: path.resolve(__dirname, '../build'),

  // Path to files and/or subdirectories in the 'build/assets' directory
  public: path.resolve(__dirname, '../public')
};

