const webpack = require("webpack");
const dev = process.env.NODE_ENV !== "production";
const path = require( "path" );
const TerserPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );

module.exports = env => {
  const { NODE_ENV } = env;
  const isEnvProd = NODE_ENV === 'production'
  console.log(process.argv)

  return {
    mode: NODE_ENV || "development",
    context: path.join( __dirname, "../" ),
    devtool: "source-map",
    target: "web",
    entry: {
      app: "./client/src/index.tsx"
    },
    output: {
      pathinfo: false,
      path: path.join(__dirname, '../dist'),
      // publicPath: '/',
      filename: '[name].bundle.js',
      // chunkFilename: '[name].[id].js'
    },
    resolve: {
      modules: [
          // path.resolve( "../client/src" ),
          // "client/node_modules",
          "node_modules"
      ],
      extensions: ['.ts', '.tsx', '.js']
    },
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
    optimization: {
      minimize: isEnvProd,
      minimizer: [
        new TerserPlugin({
          // test: /\.(t|j)sx?$/,
          terserOptions: {
            parse: {
              // need to parse ecma 8 code, but don't want to minify valid ecma5 code to invalid ecma5 code
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
            cache: true
          },
        })
      ]
    },
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  }
};
