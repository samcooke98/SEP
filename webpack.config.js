const path = require('path');
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

const PATHS = {
    app: path.join(__dirname, './src/app.js'),
    build: path.join(__dirname, 'bin'),
  };

module.exports = {
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    target: 'node',
    module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     },
    resolve: {
        extensions: ['.js'],
    },

    plugins: [
        new NodemonPlugin()
    ]
}