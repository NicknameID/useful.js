/**
 * Created by TianYu on 2017/6/16.
 */
let webpack = require('webpack');
module.exports = {

    devtool: 'eval-source-map',//生成source map方便调试

    entry: __dirname + '/js/go.js',//入口js文件
    output: {
        path: __dirname + '/build',//打包后的存放文件夹
        filename: 'mm.js',
    },

  devServer:{
    contentBase:'./build',
    hot:true,
    historyApiFallback:true,
    inline:true,//实时刷新
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

};
