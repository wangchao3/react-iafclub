var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var nib = require('nib');
module.exports = {
    context: __dirname,
    entry: [
        './src/app.js',
        './src/app/alt.js',
        './src/utils/request.js',
        './src/app/common/services/authentication',
    ],
    output: {
        path: path.join(__dirname, "./build"),
        publicPath: "/build/",
        filename: "bundle.js",
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.styl', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules)/,
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
        ]
    },
    devtool: "source-map",
    plugins: [
        new ExtractTextPlugin("bundle.css", {allChunks: true}),
        new webpack.HotModuleReplacementPlugin()
    ],
    stylus: {
        use: [nib()]
    },
    node: {
        net: "empty",
        fs: "empty",
    }
};
