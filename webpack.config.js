//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].bundle.js', //chunk: 하나의 번들 파일을 효과적으로 다루기 위해 여러가지의 파일로 다시 나누는 것
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/, //특정 로더의 대상이 될 파일들의 확장자 (ex. 여기 지정된 ts, js 파일은 babel-loader의 대상이 된다)
        exclude: /nodeModules/, //번들러가 무시해야 하는 파일
        use: {
          loader: 'babel-loader', //사용할 로더 종류, 배열로 작성하면 배열의 순서대로 실행됨
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, //폰트 파일이 로더될 수 있도록 함
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
    ]
  },
    resolve: { // 모듈 해석에 대한 설정을 지정할 수 있어 모듈을 로드할 때 별칭을 준다던가, 
      // 설치된 라이브러리를 가져올 떄 어느 폴더를 기준으로 가져올지 결정하는 등의 설정을 할 수 있다.
    extensions: ['.tsx', '.ts', '.js', '.json'], // 이 배열 순서대로 확장자를 해석함
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  // 웹팩이 html 파일 템플릿을 알 수 있도록 하는 플러그인
}
