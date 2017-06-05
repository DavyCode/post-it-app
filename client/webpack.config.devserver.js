/**
 * This file is only used for webpack-dev-server.
 */
 'use strict';

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, './'),
    entry: {
        js: './src/index.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot-loader',
                    'babel-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loaders:[
                    'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],
    },
    resolve: {
        alias: {
            assets: path.resolve('./src/assets'),
            components: path.resolve('./src/components'),
            hocs: path.resolve('./src/hocs')
        },
        extensions: ['.js', 'jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html', // Move the index.html file...
            inject: true // inject all files that are generated by webpack, e.g. bundle.js, style.css with the correct HTML tags
        }),
    ],
    devtool: 'source-map',
    devServer: {
        hot: true
    }
};