import {browserHistory} from "react-router";
import {checkWechatAuth} from '../../wechat/services/oauth'
import {isWechat} from '../../wechat/services/wechat'
import Cookies from "js-cookie";
import {request} from "../../../utils/request";
import qs from "qs";

let user = null;

export function isLogin(){
    const token = Cookies.get("hasLogin") || false;
    return token;
}

export function getUser(){
    let user = YC.current_user;
    if(!user) return null;
    user.id = user.userId;
    return user;
}

export function getJWT(){
    const token = Cookies.set("jwt") || "";
    if(!token) return null;
    return token;
}

export function authUserId(token ,refresh){
    Cookies.set("userId", token, {expires: 365 * 5});
    if(refresh) location.reload();
}

export function hasLogin(token ,refresh){
    Cookies.set("hasLogin", token, {expires: 365 * 5});
    if(refresh) location.reload();
}

export function auth(token, refresh){
    Cookies.set("jwt", token, {expires: 365 * 5});
    if(refresh) location.reload();
}

export function expires(refresh) {
    Cookies.remove("jwt");
    if(refresh) location.reload();
}

export function loginRequired(next, replace) {
    if(isLogin()) return undefined;
    if(isWechat()) return checkWechatAuth();
    let referer = location.href;
    const path = location.pathname;
    if(path === '/auth/phone_check' || path === '/register') referr = location.protocol + '//' + location.hostname + '/home';
    replace({pathname: '/auth/phone_check', query: {referer: encodeURIComponent(referer)}});
}

export function unLoginRequired(next, replace) {
    if(!isLogin()) return undefined;
    replace({pathname: '/'});
}
