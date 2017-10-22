const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


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
				use: [ 'babel-loader' ],
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
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
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			sourceMap: false
		}),
		new ExtractTextPlugin({
			filename: '[name].css'
		})
	]

};