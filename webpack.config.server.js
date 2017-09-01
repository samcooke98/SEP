const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
	externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
	node:{ 
		__dirname: false
	},
	watch: true, 
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
		new StartServerPlugin('server.js'),
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.NamedModulesPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
		new CleanWebpackPlugin(path.resolve(__dirname, "build")),
		
	]
};