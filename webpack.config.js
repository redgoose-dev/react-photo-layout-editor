const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = (env, options) => {
  const isDev = options.mode === 'development';

  // base
  let out = {
    mode: isDev ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            publicPath: './',
            name: '[name].[ext]',
            limit: 10000,
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].css' }),
    ],
    optimization: {},
  };

  if (isDev)
  {
    /**
     * Development
     */
    out.entry = {
      app: './src/development/index.js',
    };
    out.output = {
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    };
    out.module.rules.push({
      test: /\.html$/,
      use: [
        {
          loader: "html-loader",
          options: { minimize: false }
        }
      ]
    });
    out.devtool = 'inline-source-map';
    out.devServer = {
      hot: true,
      host: '0.0.0.0',
      port: options.port || 3000,
      stats: {
        color: true,
      },
      //before: require('./upload/script-node'),
      historyApiFallback: true,
      noInfo: true,
    };
    out.plugins.push(new HtmlWebpackPlugin({
      template: './src/development/index.html',
    }));
  }
  else
  {
    /**
     * Production
     */
    out.entry = {
      PhotoLayoutEditor: './src/production/index.js',
    };
    out.output = {
      path: __dirname + '/build',
      filename: '[name].js',
      publicPath: './',
      library: '[name]',
      libraryTarget: 'umd',
      libraryExport: 'default'
    };
    out.externals = {
      jquery: 'jQuery',
      react: 'React',
      'react-dom': 'ReactDOM'
    };
    out.optimization.minimizer = [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ];
  }

  return out;
};

module.exports = config;