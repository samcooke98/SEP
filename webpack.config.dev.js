//Client development webpack configuration
//This is used by the server
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');

module.exports = {
	entry: ['./src/client/index.js', 'webpack-hot-middleware/client'],
	output: {
		filename: 'client.bundle.js',
		path: path.resolve(__dirname, 'build/static/')
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
				use: ['style-loader', 'css-loader']
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};

//TODO: We need to implement a production webpack as well	