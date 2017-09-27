const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log(__dirname);

module.exports = {
	entry: [
		'babel-polyfill',
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
		new CleanWebpackPlugin(path.resolve(__dirname, "../build/static/"), { allowExternal: true }),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new ManifestPlugin(),
		new UglifyJSPlugin(),
		new webpack.optimize.UglifyJsPlugin(), //minify everything
		new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks 
		new ExtractTextPlugin("styles.css"),

	]
};