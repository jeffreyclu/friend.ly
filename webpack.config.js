const path = require('path');

module.exports = () => {
  console.log('NODE_ENV: ', process.env.NODE_ENV);
  return {
    mode: process.env.NODE_ENV,
    entry: {
      main: './client/index.js',
    },
    output: {
      publicPath: '/build/',
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    devServer: {
      publicPath: '/build',
      hot: true,
    },
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
      ],
    },
  };
};
