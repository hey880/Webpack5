// 개발용 웹팩 설정
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'inline-source-map',
  resolve: { extensions: ['.js', '.json', '.ts', '.tsx'] },
  devServer: {
    https: true,
    host: 'localhost',
    compress: true, // 제공되는 모든 항목에 대해 gzip 압축 활성화
    hot: true, //	웹팩으로 빌드한 결과물이 웹 애플리케이션에 실시간으로 반영될 수 있게(핫 로딩) 하는 설정
    port: 3000,
    open: true, //서버가 시작된 후 브라우저를 열도록 하는 옵션
    client: {
      progress: true, // 브라우저에서 컴파일 진행률을 백분율로 출력, 사용법: npx webpack serve --client-progress
      // 비활성활 하려면 npx webpack serve --no-client-progress
    },
  },
  stats: {
    cachedModules: false, // 빌드되지 않고 캐시 된 모듈에 대한 정보를 추가할지 여부를 stats에 알려줌
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name]-[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: false,
            name: 'images/[name]-[hash].[ext]',
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  plugins: [new HtmlWebPackPlugin({ template: './public/index.html' })],
};
