const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {

	context: __dirname,

	entry: {
		PhotoLayoutEditor: './src/export.js'
	},

	output: {
		path: __dirname + '/build',
		publicPath: './',
		filename: '[name].js',
		libraryTarget: 'umd',
		library: '[name]',
		libraryExport: 'default'
	},

	devtool: false,

	externals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	},

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
									"env",
									{
										"targets": {
											"browsers": [ "last 2 versions" ]
										}
									}
								],
								"react",
								"stage-2"
							],
						}
					}
				],
				exclude: /node_modules/,
			},
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								alias: {},
							},
						},
						'sass-loader'
					]
				})
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
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
			},
		}),
		new ExtractTextPlugin({
			filename: '[name].css'
		}),
	],

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
						comments: false,
					}
				}
			})
		]
	},

};