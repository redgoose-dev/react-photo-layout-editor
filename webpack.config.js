const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = (env, options) => {
  const isDev = options.mode === 'development';

  // base
  let out = {
    name: 'PhotoLayoutEditor',
    mode: isDev ? 'development' : 'production',
    resolve: {
      extensions: [ '.js', '.jsx' ],
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
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
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ].filter(Boolean),
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file-loader',
          options: {
            publicPath: './',
            name: '[name].[ext]',
            limit: 10000,
          },
        },
        isDev && {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: false }
            }
          ]
        },
      ].filter(Boolean),
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      isDev && new HtmlWebpackPlugin({ template: './src/development/index.html' }),
    ].filter(Boolean),
    optimization: {},
  };

  if (isDev)
  {
    /**
     * Development
     */
    out.entry = {
      // app: './src/development/index.js',
      app: path.join(__dirname, 'src/development/index.js'),
    };
    out.output = {
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    };
    out.devtool = 'inline-source-map';
    out.devServer = {
      hot: true,
      host: '0.0.0.0',
      port: options.port || 3000,
      stats: 'minimal',
      //before: require('./upload/script-node'),
      historyApiFallback: true,
      noInfo: true,
    };
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
      'jquery/dist/jquery.slim': 'jQuery',
      'react': 'React',
      'react-dom': 'ReactDOM'
    };
    out.optimization = {
      minimize: true,
      minimizer: [
        new TerserJSPlugin({}),
        new CssMinimizerPlugin(),
      ],
    };
  }

  return out;
};

module.exports = config;