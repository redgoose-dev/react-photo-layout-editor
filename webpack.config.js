const webpack = require('webpack');


module.exports = {

	context: __dirname,

	entry: {
		'PhotoLayoutEditor': './src/PhotoLayoutEditor/index.js'
	},

	output: {
		path: __dirname + '/build',
		filename: 'PhotoLayoutEditor.js',
		libraryTarget: 'umd',
		library: 'PhotoLayoutEditor',
	},

	devtool: 'source-map',

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
		},
		"classnames": {
			"commonjs": "classnames",
			"commonjs2": "classnames",
			"amd": "classnames",
			"root": "classNames"
		},
		"prop-types": {
			"commonjs": "prop-types",
			"commonjs2": "prop-types",
			"amd": "prop-types",
			"root": "PropTypes"
		},
		"jquery/dist/jquery.slim": {
			"commonjs": "jquery",
			"commonjs2": "jquery",
			"amd": "jquery",
			"root": "$"
		},
		"react-grid-layout": {
			"commonjs": "react-grid-layout",
			"commonjs2": "react-grid-layout",
			"amd": "react-grid-layout",
			"root": "PropTypes"
		},
		"react-redux": {
			"commonjs": "react-redux",
			"commonjs2": "react-redux",
			"amd": "react-redux",
			"root": "PropTypes"
		},
		"react-simple-colorpicker": {
			"commonjs": "react-simple-colorpicker",
			"commonjs2": "react-simple-colorpicker",
			"amd": "react-simple-colorpicker",
			"root": "PropTypes"
		},
		"redux": {
			"commonjs": "redux",
			"commonjs2": "redux",
			"amd": "redux",
			"root": "PropTypes"
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
				use: [ 'babel-loader' ],
				exclude: /node_modules/
			}
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			sourceMap: true
		}),
	]

};