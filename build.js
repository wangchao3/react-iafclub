var pug = require('pug');
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
// var ncp = require('ncp').ncp;

var env = process.argv[2] || 'dev'

function writeIndexFile(env, hash){
    var sourceFile = path.join(__dirname, 'src/app.pug');
    var html = pug.renderFile(sourceFile, {env: env, hash: hash});
    fs.writeFileSync(path.join(__dirname, 'index.html'), html, {encoding: "utf-8"});
}

function build(env){
    if(env === 'production'){
        var opt = require('./webpack.publish.config.js');
        webpack(opt, function(err, stats){
            if(err) return console.log(err);
            hash = stats.toJson().hash;
            console.log('hash: '+ hash);
            writeIndexFile(env, hash);
            console.log('build success!');
        });
    }else if(env === 'dev'){
        writeIndexFile(env);
        var devOpt = require('./webpack.config.js');
        var compiler = webpack(devOpt);
        startDevServer(devOpt);
    }else if(env === 'test'){
        var opt = require('./webpack.config.js');
        webpack(opt, function(err, stats){
            if(err) return console.log(err);
            writeIndexFile(env);
            console.log('build success!');
        });
    }
    // copyAssets(env);
}

// function copyAssets(env){
//     var sources = ['assets', 'lib'];
//     var dest = env === 'production' ? 'dist' : 'build';
//     sources.map(function(source){
//         var src = path.join(__dirname, source);
//         var destination = path.join(__dirname, dest, source);
//         ncp(src, destination, function (err) {
//             if (err) {
//                 return console.error(err);
//             }
//             console.log(source + ' copied!');
//         });
//     })

// }

function startDevServer(devOpt){
    var compiler = webpack(devOpt);
    var server = new WebpackDevServer(compiler, {
        contentBase: __dirname,
        progress: true,
        inline: true,
        filename: 'bundle.js',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        publicPath: '/build/',
        stats: { colors: true },
        historyApiFallback: true
    });
    server.listen(7575, "127.0.0.1");
    console.log("dev server start on port 7575");
}

if(require.main === module) build(env);

module.exports = build
