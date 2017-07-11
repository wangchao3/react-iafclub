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

var wechat = require('./server/wechat');
var YJFPasswordToken = require('./server/yjf');

app.post('/wechat/config', function(req, res){
    var url = req.body.url;
    wechat.generateWechatConfig(url, function(config){
        res.send(config);
    })
})

app.post('/services/wechat/get_user_info', wechat.getWeChatUserInfo);

app.get('/services/yjf/passtoken', YJFPasswordToken);

app.get('/services/wechat/Oauth', function(req, res){
    var code = req.query.code || '';
    var state = req.query.state || '';
    var redirect = req.query.redirect || 'http://m.yunchou.com/wechat/oauth';
    res.redirect(301, redirect + '?code=' + code + '&state=' + state);
})

app.get('/welcome', function(req, res){
    res.redirect('/welcome/landing?source=ad');
});

app.get('/hello', function(req, res){
    var url = "/welcome/landing"
    var source = req.query.source;
    if(source) url += "?source=" + source;
    res.redirect(url);
});


app.get('*', function(req, res){
    // console.log(req.cookies, env);
    // fetchUserData(req.cookies.jwt, req.cookies.userId, env).then((response)=>{
    //     var data = response.data;
    //     console.log(data);
    //     if(data.responseCode !== "00" || !data.content) return res.render(path.join(__dirname, "index.html"));
    //     console.log(data.content);
    //     return res.render(path.join(__dirname, "index.html"), {user: data.content})
    // }, (error) => {
    //     res.render(path.join(__dirname, "index.html"))
    // })
    res.render(path.join(__dirname, "index.html"))
})

var server = app.listen(port, function(){
    console.log('server started at localhost '+port);
})

if(env === "dev") build("dev");

function fetchUserData(jwt, userId, env) {
    if(!jwt) return Promise.reject("jwt required");
    var url = 'http://mdev.iafclub.com/jrrest/members/'+userId;
    if(env === "dev") url = 'http://mdev.iafclub.com/jrrest/members/'+userId;
    if(env === "preview") url = 'http://m.iafclub.com/jrrest/members/'+userId;
    console.log(url);
    return axios.get(url, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Token": jwt,
        },
        responseType: "json",
    })
}
