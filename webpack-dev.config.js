const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

	context: resolve(__dirname, 'src'),

	entry: [
		'react-hot-loader/patch',
		`webpack-dev-server/client?http://localhost:4040`,
		'webpack/hot/only-dev-server',
		'./dev/index.js'
	],

	devServer: {
		hot: true,
		contentBase: resolve(__dirname, 'build'),
		publicPath: '/',
		historyApiFallback: true,
		disableHostCheck: true
	},

	output: {
		path: resolve(__dirname, 'build'),
		publicPath: './',
		filename: '[name].js',
		chunkFilename: '[name].js',
		//library: 'PhotoLayoutEditor',
		//libraryTarget: 'var',
	},

	devtool: 'cheap-eval-source-map',

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: true,
							plugins: [ 'react-hot-loader/babel' ]
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpg|png)$/,
				loader: 'file-loader',
				options: {
					name: 'assets/images/[name].[ext]',
				},
			},
		]
	},

	plugins: [
		new HtmlWebpackPlugin({ template: 'dev/index.html' }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]

};