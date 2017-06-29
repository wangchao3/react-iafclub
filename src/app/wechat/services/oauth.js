import wechatConfig from '../constants/wechat'
import url from '../constants/url'
import {auth, isLogin} from '../../common/services/authentication'
import {isWechat} from './wechat'

export function checkWechatAuth() {
    if(!isWechat()) return false;
    const wechatUnionID = localStorage['webchatUnionID'];
    if(!wechatUnionID || !isLogin()){
        setWechatOauthReferer();
        const wechatOauthUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ wechatConfig.app_id +"&redirect_uri="+ encodeURIComponent(wechatConfig.oauth_url + '?redirect=' + wechatConfig.oauth_callback_url + '&provider=wechat') +"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        location.href = wechatOauthUrl;
        return true;
    }
    return false;
}

export function getWechatOauthUri() {
    return "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ wechatConfig.app_id +"&redirect_uri="+ encodeURIComponent(wechatConfig.oauth_url + '?redirect=' + wechatConfig.oauth_callback_url + '&provider=wechat') +"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
}

export function setWechatOauthReferer(){
    let referer = location.href;
    const path = location.pathname;
    if(path === '/login' || path === 'register') referer = location.protocol + '//' + location.hostname + '/home';
    localStorage['wechatOauthRedirect'] = referer;
}
