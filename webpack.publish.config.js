var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var nib = require("nib");
module.exports = {
    entry: {
        app: [
            './src/app.js',
            './src/app/alt.js',
            './src/utils/request.js',
            './src/app/common/services/authentication'
        ]
    },
    output: {
        path: path.join(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: "bundle.[hash].js",
        chunkFilename: "chunk.[chunkhash].js"
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.styl']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|lib)/
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("bundle.[hash].css", {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env':{
              'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    stylus: {
        use: [nib()]
    },
    node: {
        net: "empty",
        fs: "empty",
    }
}
