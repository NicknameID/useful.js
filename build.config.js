/**
 * Created by TianYu on 2017/6/16.
 */
/**
 * Created by TianYu on 2017/6/16.
 */
let webpack = require('webpack');
module.exports = {

  entry: __dirname + '/js/go.js',//入口js文件
  output: {
    path: __dirname + '/dist',//打包后的存放文件夹
    filename: "mm.min.js"
  },


  module:{
    rules:[
      {
        test:/\.js$/,
        use:[{
          loader:'babel-loader',
          options:{
            presets:['es2015']
          }
        }]
      },
    ],
  },

  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      debug:true,
      minimize:true,
      sourceMap:false,
      comments:false,
      output:{
        comments:false
      }
    }),
  ],

};