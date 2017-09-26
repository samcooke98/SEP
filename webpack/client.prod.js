const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: [
		'./src/client/index.js',
	],
	output: {
		filename: 'client-[chunkHash].js',
		path: path.resolve(__dirname, '../build/static'),
		publicPath: path.resolve(__dirname, "../build/static")
	},
	target: 'web',
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
				use: [
					"style-loader",
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
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(path.resolve(__dirname, "build/static/")),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new ManifestPlugin(),
		new UglifyJSPlugin(),
		new webpack.optimize.UglifyJsPlugin(), //minify everything
		new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 

	]
};