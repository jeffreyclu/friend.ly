const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  console.log('NODE_ENV: ', process.env.NODE_ENV);
  return {
    mode: process.env.NODE_ENV,
    entry: {
      index: './client/index.jsx',
      dashboard: './client/dashboard.jsx'
    },
    output: {
      publicPath: '/build/',
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    devServer: {
      publicPath: '/build',
      proxy: {
        '/dashboard': 'http://localhost:3000',
        '/api': 'http://localhost:3000',
      },
      hot: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // if we are not in production, fall back to 'style-loader'
            process.env.NODE_ENV === 'development'
              ? 'style-loader'
              : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '/build/',
                },
              },
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
            {
              loader: 'sass-loader',
              options: {
                // Prefer 'dart-sass'
                implementation: require('sass'),
              },
            },
          ],
        },
        // load images
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: ['file-loader'],
        },
      ],
    },
  };
};
