const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: __dirname + '/public',
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loaders: ['babel-loader', 'awesome-typescript-loader'],
            },

            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.(scss)|.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader', // translates CSS into CommonJS modules
                        },
                        {
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                                plugins() {
                                    return [precss, autoprefixer];
                                },
                            },
                        },
                        {
                            loader: 'sass-loader', // compiles SASS to CSS
                        },
                    ],
                }),
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    'image-webpack-loader',
                ],
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot)(\?[\s\S]+)?$/,
                // test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, add font pasth with folder or file name. else svg sprite will not work
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new ExtractTextPlugin('site.css'),
    ],
};
