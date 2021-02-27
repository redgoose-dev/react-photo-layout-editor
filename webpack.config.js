const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dev = process.env.NODE_ENV !== 'production';

const config = (env, options) => {
  let out = {
    name: 'PhotoLayoutEditor',
    mode: dev ? 'development' : 'production',
    resolve: {
      extensions: [ '.js', '.jsx', '.ts' ],
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s?css$/,
          use: [
            !dev && MiniCssExtractPlugin.loader,
            dev && 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: { fiber: require('fibers') },
              },
            },
          ].filter(Boolean),
        },
      ],
    },
    plugins: [
      dev && new HtmlWebpackPlugin({ template: './development/index.html' }),
      !dev && new MiniCssExtractPlugin({ filename: '[name].css' }),
    ].filter(Boolean),
    optimization: {},
  };

  if (dev)
  {
    /**
     * Development
     */
    out.entry = {
      app: path.join(__dirname, 'development/index.js'),
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
      // compress: true,
      historyApiFallback: true,
      noInfo: false,
    };
  }
  else
  {
    /**
     * Production
     */
    out.entry = {
      PhotoLayoutEditor: path.join(__dirname, 'src/production.js'),
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
      'react': 'React',
      'react-dom': 'ReactDOM',
      'recoil': 'recoil',
    };
    out.optimization.minimizer = [];
  }

  return out;
};

module.exports = config;
