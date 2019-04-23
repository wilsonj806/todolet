// NOTE Babel can transpile TypeScript but can't do everything

const path = require("path");
const include = path.resolve(__dirname, '../');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ]
      },
      {
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['react-app', {flow: false, typescript: true}]]
            }
          },
        /*{
            loader: 'ts-loader',
            options: {
              "compilerOptions": {
                "noEmit": false
              }
            }
          } */
        ],
        exclude: /node_modules/,
        include
      },
    ]
  }
};