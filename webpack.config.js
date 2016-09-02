'use strict';
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV == 'development';

module.exports = {
    context: __dirname + '/src',

    entry: {
        home: './home',
        about: './about'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: '[name]'
    },

    watch: isDev,
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: isDev ? 'inline-source-map' : null,

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        }),
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015']
            }
        }]
    },

    //optimizations: better build
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
