import alt from '../../alt'
import PasswordActions from '../actions/password'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {auth, authUserId} from '../../common/services/authentication'
import {getAuthDataFromLocal} from '../services/mobile';

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
        console.log(payload);
        payload.phone = this.mobilePhone;
        jsonRequest
        .post(url.login, payload)
        .then((res) => {
            if(res.data.responseCode === '00') {
                auth(res.data.content.token);
                authUserId(res.data.content.userId);
            }
            this.emitChange();
        }).catch((error) => {
            return alert('提交失败');
        })
    }

}

export default alt.createStore(PasswordStore, 'PasswordStore')
