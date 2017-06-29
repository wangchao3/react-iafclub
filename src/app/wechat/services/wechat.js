import {request} from '../../../utils/request';

export function isWechat() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
}

export function setRootPath() {
    const port = location.port ? ':' + location.port : '';
    localStorage['rootPath'] = location.protocol + '//' + location.hostname + port + location.pathname + location.search;
}

export function getPathName() {
    return localStorage['rootPath'];
}

export function getWechatConf(debug, apiList) {
    return new Promise(function(fullfilled, reject){
        const pathName = getPathName();
        let wx = window.wx;
        if(!wx) return reject("微信公用库加载失败");
        request
        .post('/wechat/config', {url: pathName}, {baseURL: ""})
        .then((res) => {
            var config = res.data;
            if(debug) config.debug = true;
            config.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
            if(Object.prototype.toString.call(apiList) === "[object Array]" && apiList.length){
                config.jsApiList = config.jsApiList.concat(apiList);
            };
            wx.config(config);
            fullfilled(res.data)
        })
        .catch(reject);
    })

}