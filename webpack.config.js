const path = require('path'); 
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css'); //to extract css files into their own file

    return {
        mode: isProduction ? 'production' : 'development',
        entry: ['babel-polyfill','./src/app.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },{                         //rules needed for styling
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader', // Needed for Bootstrap
                        options: {
                          plugins:  () => { // post css plugins, can be exported to postcss.config.js
                            return [
                              require('autoprefixer')
                            ];
                          }
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }]
        },
        plugins: [
            CSSExtract,
            new Dotenv(),
            new webpack.DefinePlugin({
                'process.env.AIRTABLE_API_KEY': JSON.stringify(process.env.AIRTABLE_API_KEY)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map', //This allows the console to point you to the correct file instead of the bundle file
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
};