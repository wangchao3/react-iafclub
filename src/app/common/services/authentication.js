import {browserHistory} from "react-router";
import {checkWechatAuth} from '../../wechat/services/oauth'
import {isWechat} from '../../wechat/services/wechat'
import Cookies from "js-cookie";
import {request} from "../../../utils/request";
import qs from "qs";

let user = null;

export function isLogin(){
    return !!YC.current_user;
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
    if(path === '/login' || path === '/register') referr = location.protocol + '//' + location.hostname + '/home';
    replace({pathname: '/login', query: {referer: encodeURIComponent(referer)}});
}

// function parseJWTFromLocal(){
//     const token = localStorage['jwt'];
//     if(!token) return false;
//     try{
//         return jwt.decode(token, null, 'RS256');
//     }catch(e){
//         localStorage['jwt'] = '';
//         throw new Error(e);
//     }
// }
//
// function getUserInfoRequest() {
//     return new Promise((resolve, reject)=> {
//         const jwt = localStorage["jwt"];
//         if(!jwt) return reject(403);
//         request.post("user/getUserIdentityInfo", {jwt: jwt}).then((response)=> {
//             const data = response.data;
//             if(!data.identityInfo || !data.identityInfo.userId) return reject(data.message);
//             user = data.identityInfo;
//             resolve(data.identityInfo);
//         }, reject)
//     })
// }
