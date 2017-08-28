var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var app = express();
var path = require('path');
var swig = require('swig');
var argv = require('yargs').argv;
var axios = require("axios");
var qs = require("qs");
var build = require("./build")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/build', express.static('build'));
app.use('/assets', express.static('assets'));
app.use('/lib', express.static('lib'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/src/templates');

var env = argv.v || 'production';
var port;
switch(env){
    case 'preview':
        port = 8686;
    break;
    //其它...
    default:
        port = 3333;
}

app.get('*', function(req, res){
    res.render(path.join(__dirname, "index.html"))
})

var server = app.listen(port, function(){
    console.log('server started at localhost '+port);
})

if(env === "dev") build("dev");
