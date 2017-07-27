import {browserHistory} from "react-router";
import {checkWechatAuth} from '../../wechat/services/oauth'
import {isWechat} from '../../wechat/services/wechat'
import Cookies from "js-cookie";
import {request} from "../../../utils/request";
import qs from "qs";
import {getUserInfoFromLocal} from '../../auth/services/userInfo';

let user = null;

export function isLogin() {
    const token = Cookies.get("token");
    if (token)
        return true;
    return false;
}

export function getUser() {
    const userInfo = getUserInfoFromLocal('userInfo');
    let user = userInfo.res;;
    if (!user)
        return null;
    return user;
}

export function getToken() {
    const token = Cookies.set("token") || "";
    if (!token)
        return null;
    return token;
}

export function auth(token, refresh) {
    Cookies.set("token", token, {
        expires: 365 * 5
    });
    if (refresh)
        location.reload();
    }

export function expires(refresh) {
    Cookies.remove("token");
    if (refresh)
        location.reload();
    }

export function loginRequired(next, replace) {
    if (isLogin())
        return undefined;
    if (isWechat())
        return checkWechatAuth();
    let referer = location.href;
    const path = location.pathname;
    if (path === '/user/login' || path === '/user/register')
        referr = location.protocol + '//' + location.hostname + '/home';
    replace({
        pathname: '/user/login',
        query: {
            referer: encodeURIComponent(referer)
        }
    });
}
