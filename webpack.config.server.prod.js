const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: [
        './src/server/index.js',
	],
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: path.resolve(__dirname, "build")
	},
	target: 'node',
	externals: [nodeExternals(), {
        "./static/manifest.json": JSON.stringify(require(path.resolve(__dirname, "build/static/manifest.json")))
    }],
	node:{ 
		__dirname: false
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				}
			}
		]
	},
	plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // new webpack.IgnorePlugin(/manifest.json/)	
    ],
    // externals: [
    //     "./static/manifest.json"
    // ]
};