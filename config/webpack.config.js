const webpack = require("webpack");
const dev = process.env.NODE_ENV !== "production";
const path = require( "path" );
// const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
// const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
// const HtmlWebpackPlugin = require( "html-webpack-plugin" );


const plugins = [
  // new webpack.NormalModuleReplacementPlugin(
  //   // 'lib/adapter/http.js'
  // )
]

module.exports = {
  mode: "development",
  context: path.join( __dirname, "../" ),
  devtool: "source-map",
  target: "web",
  entry: {
    app: "./client/src/index.tsx"
  },
  output: {
    path: path.join(__dirname, '../dist'),
    // publicPath: '/',
    filename: '[name].bundle.js',
    // chunkFilename: '[name].[id].js'
  },
  resolve: {
    modules: [
        path.resolve( "../client/src" ),
        // "client/node_modules",
        "node_modules"
    ],
    extensions: ['.ts', '.tsx', '.env', '.js']
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use : {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": "> 25%",
                }
              ],
              "@babel/preset-react",
              [
                "@babel/preset-typescript",
                {
                  "allExtensions": true,
                  "isTSX": true
                }
              ],
            ]
          }
        }
      },
    ],
  },
};
