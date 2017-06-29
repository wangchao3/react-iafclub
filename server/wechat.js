var request = require('request');
var crypto = require('crypto');

var APP_ID = 'wx781d587497b02120';
var APP_SECRET = '7dfd0c3cea11aaf710334b6ee4898035';

var dataCache = {};

function generateWechatConfig(url, callback) {
    var data = {
        noncestr: generateRandomStr(12),
        timestamp: parseInt(new Date().getTime() / 1000),
        url: url
    };

    var conf = {
        appId: APP_ID,
        timestamp: data.timestamp,
        nonceStr: data.noncestr
    };

    getJsapiTicket(function(ticket){
        data.jsapi_ticket = ticket;
        conf.signature = generateSignature(data);
        callback(conf);
    });
}

function getWebAccessTokenAndOpenid(req, res) {
    var code = req.query.code;
    if(!code) return res.status(400).send({'message': 'invalid parmas'});
    getWebAccessTokenAndOpenidRequest(code, function(body){
        return res.send(body);
    })
}

function getWebAccessTokenAndOpenidRequest(code, callback) {
    request
        .get('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+ APP_ID +'&secret='+ APP_SECRET +'&code='+ code +'&grant_type=authorization_code', function(err, response, body){
            if(err || response.statusCode !== 200) return getWebAccessTokenAndOpenidRequest(code, callback);
            callback(JSON.parse(body));
        })
}

function getWeChatUserInfo(req, res) {
    var code = req.body.code;
    if(!code) return res.status(400).send({'message': 'invalid parmas'});
    getWebAccessTokenAndOpenidRequest(code, function(body) {
        getUserInfoRequest(body.access_token, body.openid, function(response){
            console.log(response);
            return res.send(response);
        })
    });
}

function getUserInfoRequest(accessToken, openid, callback) {
    request
        .get('https://api.weixin.qq.com/sns/userinfo?access_token='+ accessToken +'&openid='+ openid +'&lang=zh_CN', function(err, response, body){
            if(err || response.statusCode !== 200) return getUserInfoRequest(accessToken, openid, callback);
            callback(JSON.parse(body));
        })
}

function generateRandomStr(len){
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex')
        .slice(0,len);
}

function getAccessToken(callback) {
    var now = new Date().getTime();
    if(dataCache.accessToken && dataCache.accessToken.expired > now) return callback(dataCache.accessToken.value);
    request
        .get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ APP_ID +'&secret=' + APP_SECRET, function(err, response, body){
            if(err || response.statusCode !== 200) return getAccessToken(callback);
            var body = JSON.parse(body);
            dataCache.accessToken = {
                value: body.access_token,
                expired: new Date().getTime() + (body.expires_in * 1000)
            };
            return callback(dataCache.accessToken.value);
        });
    return null;
}

function getJsapiTicket(callback) {
    getAccessToken(function(accessToken){
        jsapiTicketRequest(accessToken, callback);
    })
}

function jsapiTicketRequest (accessToken, callback){
    var now = new Date().getTime();
    if(dataCache.ticket && dataCache.ticket.expired > now) return callback(dataCache.ticket.value);
    request
        .get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ accessToken +'&type=jsapi', function(err, response, body){
            if(err || response.statusCode !== 200) return jsapiTicketRequest(callback);
            var body = JSON.parse(body);
            dataCache.ticket = {
                value: body.ticket,
                expired: new Date().getTime() + (body.expires_in * 1000)
            };
            return callback(dataCache.ticket.value);
        })
}

function generateSignature(data) {
    var signature = "";
    var keys = ['jsapi_ticket', 'noncestr', 'timestamp', 'url'];
    var cloneData = {};
    for(var i=0, l=keys.length; i<l; i++){
        cloneData[keys[i]] = data[keys[i]];
    }
    for(var key in cloneData){
        signature += key + '=' + cloneData[key] + '&';
    };
    signature = signature.slice(0, -1);
    return sha1(signature);
}

function sha1( data ) {
     var generator = crypto.createHash('sha1');
     generator.update( data )
     return generator.digest('hex')
}

exports.generateWechatConfig = generateWechatConfig;
exports.getWeChatUserInfo = getWeChatUserInfo;
