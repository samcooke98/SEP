const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/server/index.js',
	],
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, '../build'),
		publicPath: path.resolve(__dirname, "../build")
	},
	target: 'node',
	externals: [nodeExternals({
		whitelist: [
			/^react-toolbox/, //Regex actually works, strings didn't seem to be 
			/^react-css-themr/,
			/\.(?!(?:jsx?|json|css|scss)$).{1,5}$/i,
			/^react-tagsinput/

		]
	}), {
		// "./static/manifest.json": JSON.stringify(require(path.resolve(__dirname, "../build/static/manifest.json")))
	}],
	node: {
		__dirname: false,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.css$/,
				// include: /(node_modules|bower_components)/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								localIdentName: "[name]--[local]---[hash:base64:8]",
								importLoaders: 1
							}
						},
						'postcss-loader'
					]
				})
			},

		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new ExtractTextPlugin("style-server.css"),
		// new webpack.IgnorePlugin(/manifest.json/)	
	],
	// externals: [
	//     "./static/manifest.json"
	// ]
};