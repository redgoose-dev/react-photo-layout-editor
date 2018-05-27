const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

	context: resolve(__dirname, 'src'),

	entry: [
		'babel-polyfill',
		'./dev/index.js'
	],

	output: {
		path: resolve(__dirname, 'build'),
		publicPath: './',
		filename: '[name].js',
		chunkFilename: '[name].js',
	},

	devServer: {
		hot: true,
		open: false,
		publicPath: '/',
		historyApiFallback: true,
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
							babelrc: false,
							presets: [
								[
									'env',
									{
										targets: {
											browsers: [ "last 2 versions" ]
										}
									}
								],
								'react',
								'stage-2'
							],
							plugins: [
								'react-hot-loader/babel'
							]
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
	]

};