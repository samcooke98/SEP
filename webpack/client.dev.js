//Client development webpack configuration
//This is used by the server
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');

module.exports = {
	entry: ['babel-polyfill',  'webpack-hot-middleware/client', './src/client/index.js',],
	output: {
		filename: 'client.bundle.js',
		path: path.resolve(__dirname, '../build/static/'),
		publicPath: "/"
	},
	devtool: 'source-map',
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
		// new CleanWebpackPlugin(path.resolve(__dirname, "build/static/")),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};

//TODO: We need to implement a production webpack as well	