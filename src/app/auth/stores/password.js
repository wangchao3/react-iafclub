import alt from '../../alt'
import PasswordActions from '../actions/password'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {hasLogin, authUserId, auth} from '../../common/services/authentication'
import {getAuthDataFromLocal} from '../services/mobile';
import {getRefererr} from '../../../app/common/services/app';

class PasswordStore {

    constructor() {
        this.mobilePhone = null;
        this.bindActions(PasswordActions);
    }

    onInit() {
        const authBasicData = getAuthDataFromLocal('followOrgAuthData');
        console.log(authBasicData);
        if(!authBasicData) return false;
        this.mobilePhone = authBasicData.mobilePhone;
        this.emitChange();
    }

    onLogin(payload) {
        payload.phone = this.mobilePhone;
        const backUrl = getRefererr();
        console.log(backUrl);
        jsonRequest
        .post(url.login, payload)
        .then((res) => {
            if(res.data.responseCode === '00') {
                authUserId(res.data.content.userId);
                auth(res.data.content.token);
                hasLogin(true);
                if(!backUrl) {
                    window.location.href = '/';
                }else {
                    window.location.replace(decodeURIComponent(backUrl.referer));
                }
            }
            this.emitChange();
        }).catch((error) => {
            return alert(error);
        })
    }

}

export default alt.createStore(PasswordStore, 'PasswordStore')
