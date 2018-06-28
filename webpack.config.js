const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/freact.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'freact.js',
    library: 'Freact'
  }
}