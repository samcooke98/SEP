const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/server/index.js',
	],
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: path.resolve(__dirname, "build")
	},
	target: 'node',
	externals: [nodeExternals({
		whitelist: [
			'webpack/hot/poll?1000',
			/^react-toolbox/, //I find these work better
			/^react-css-themr/,
			/\.(?!(?:jsx?|json|css|scss)$).{1,5}$/i,
		]
	})],
	node: {
		__dirname: false
	},
	// watch: true,
	devtool: "inline-source-map",

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
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.css$/,
				include: /(node_modules|bower_components)/,
				use: [
					"isomorphic-style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
							sourceMap: true,
							importLoaders: 1,
							localIdentName: "[name]--[local]--[hash:base64:8]"
						}
					},
					"postcss-loader" // has separate config, see postcss.config.js nearby
				]
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




// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals')
// const StartServerPlugin = require('start-server-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')

// module.exports = {
// 	entry: [
// 		'babel-polyfill',
// 		'./src/server/index.js',
// 	],
// 	output: {
// 		filename: 'server.js',
// 		path: path.resolve(__dirname, 'build'),
// 		publicPath: path.resolve(__dirname, "build")
// 	},
// 	target: 'node',
// 	externals: [nodeExternals({
// 		whitelist: ['webpack/hot/poll?1000']
// 	})],
// 	node: {
// 		__dirname: false
// 	},
// 	devtool: "inline-source-map",
// 	module: {
// 		rules: [
// 			{
// 				test: /\.js$/,
// 				exclude: /(node_modules|bower_components)/,
// 				use: {
// 					loader: 'babel-loader',
// 				}
// 			},
// 			{
// 				test: /\.(png|svg|jpg|gif)$/,
// 				use: [
// 					'file-loader'
// 				]
// 			},

// 		]
// 	},
// 	plugins: [
// 		// new StartServerPlugin('server.js'),
// 		new webpack.HotModuleReplacementPlugin(),
// 		// new webpack.NamedModulesPlugin(),
// 		// new webpack.NoEmitOnErrorsPlugin(),
// 		new CleanWebpackPlugin(path.resolve(__dirname, "build/*"), {
// 			exclude: ['static']
// 		}),

// 	]
// };