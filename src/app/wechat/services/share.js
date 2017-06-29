import request from '../../../utils/request'
import {getUser} from '../../common/services/authentication'
import WechatShareActions from "../actions/share";
import { getWechatConf } from "./wechat";


export function setWechatShare(url, img, callback, cancel, title, desc) {
    getWechatConf()
    .then(()=> setShare(url, img, callback, cancel, title, desc))
    .catch((error) => console.info(error))
}


function setShare(url, img, callback, cancel, title, desc) {
    console.log(img);
    const user = getUser();
    const name = user ? user.displayName : '我';
    const shareTitle = title ? title : '通知：'+ name +'今天承包了一亩油茶树20年';
    const shareDesc = desc ? desc : '仅需3899元，即可享有一亩油茶树20年收益，还送生态游、公司分红哦！机会有限，速来~';
    let shareUrl;
    if (user) {
        shareUrl = url.indexOf("?") > -1 ? url += `&inviteUID=${user.uuid}` : url += `?inviteUID=${user.uuid}`;
    }else {
        shareUrl = url;
    }
    const success = function() {
        WechatShareActions.hide();
        if(callback) callback();
    }
    const config = {
        title: shareTitle,
        link: shareUrl,
        imgUrl: img,
        desc: shareDesc,
        success: success,
        cancel: cancel,
    }
    wx.onMenuShareTimeline(config);
    wx.onMenuShareAppMessage(config);
    wx.onMenuShareQQ(config);
    wx.onMenuShareWeibo(config);
    wx.onMenuShareQZone(config);
}
