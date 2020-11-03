
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack_config = {


  entry: {  rsd_2nd_bundle: './mediaServer/react/rsd_browser.js',
            podcast_3rd_bundle: './mediaServer/react/podcast_browser.js',
            pdf_4th_bundle: './mediaServer/react/pdf_browser.js'                },


  output: {  path: 'C:/somewhere',                          //REPLACED BY bundle-big/small
             filename: '[name].js'              },


  externals: { 'react': 'React',
           'react-dom': 'ReactDOM'      },  // externalizing Lodash, increases file sizes

 
  module: { rules: [ {     test: /\.js$/,
                            use: 'babel-loader',
                        exclude: /node_modules/         }      ]      },


  resolve: { extensions: [ '.js', '.jsx' ] },


  plugins: [ new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })  ],


  optimization: {      minimize: true,                    //REPLACED BY bundle-big/small
                    splitChunks: { cacheGroups: { vendor: { test: /[\\/]node_modules[\\/]/,
                                                    name: 'vendors',
                                                  chunks: 'all'             } } } } 


};

module.exports = webpack_config;