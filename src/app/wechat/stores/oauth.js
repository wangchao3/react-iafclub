import alt from '../../alt'
import WechatOauthActions from '../actions/oauth'
import {request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getJWT, auth} from '../../common/services/authentication'

class WechatOauthStore {

    constructor() {
        this.code = null;
        this.jwt = null;
        this.authKey = null;
        this.wechatUserInfo = null;
        this.bindActions(WechatOauthActions);
        this.err = null;
    }

    onGetUserInfo(code) {
        if(!code) return this.err = 400;
        if(this.code === code) return false;
        this.code = code;
        request
            .post(url.get_wechat_user_info, {code: this.code})
            .then((res) => {
                this.wechatUserInfo = res.data;
                this.authKey = res.data.unionid;
                this.authByKey();
                localStorage['webchatUnionID'] = this.authKey;
            })
            .catch((err) => {
                this.err = err || res.data.errcode;
                return this.emitChange();
            })
    }

    authByKey() {
        if(!this.authKey) return false;
        request
            .post(url.wechat_oauth, {authkey: this.authKey})
            .then((res) => {
                if(res.data.jwt){
                    auth(res.data.jwt);
                    return this.redirectToReferr();
                }
                const jwt = getJWT();
                if(jwt) return this.bindAuthKey(jwt);
                this.jwt = "NA"
                return this.emitChange();
            })
            .catch((err) => {
                this.err = 500;
                return this.emitChange();
            })
    }

    bindAuthKey(jwt) {
        request
            .post(url.wechat_bind, {jwt: jwt, authkey: this.authKey})
            .then((res) => {
                auth(res.data.jwt);
                return this.redirectToReferr();
            })
            .catch((err) => {
                this.err = 500;
                return this.emitChange();
            })
    }

    onRegister(payload) {
        payload.authkey = this.authKey;
        payload.nickname = this.wechatUserInfo.nickname;
        payload.picture = this.wechatUserInfo.headimgurl;
        payload.provider = 'wechat';
        request
            .post(url.wechat_register, payload)
            .then((res) => {
                auth(res.data.jwt);
                return this.redirectToReferr();
            })
            .catch((err) => {
                this.err = 500;
                return this.emitChange();
            })
    }

    redirectToReferr() {
        const referer = localStorage['wechatOauthRedirect'] || location.protocol + '//' + location.hostname + '/home';
        return location.href = referer;
    }

}

export default alt.createStore(WechatOauthStore, 'WechatOauthStore')
