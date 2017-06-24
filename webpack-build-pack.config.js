const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {

	context: __dirname,

	entry: {
		'PhotoLayoutEditor': './src/PhotoLayoutEditor/index.pack.js'
	},

	output: {
		path: __dirname + '/build',
		filename: '[name].pack.js',
		libraryTarget: 'umd',
		library: 'PhotoLayoutEditor',
	},

	devtool: false,

	externals: {
		"react": {
			"commonjs": "react",
			"commonjs2": "react",
			"amd": "react",
			"root": "React"
		},
		"react-dom": {
			"commonjs": "react-dom",
			"commonjs2": "react-dom",
			"amd": "react-dom",
			"root": "ReactDOM"
		}
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
		new webpack.optimize.CommonsChunkPlugin({
			name: 'PhotoLayoutEditor.vendor',
			minChunks: function (module) {
				return (
					module.context && module.context.indexOf('node_modules') !== -1
				);
			}
		}),
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
			filename: '[name].pack.css'
		})
	]

};