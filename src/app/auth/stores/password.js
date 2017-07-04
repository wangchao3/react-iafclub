import alt from '../../alt'
import PasswordActions from '../actions/password'
import {request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getJWT, auth} from '../../common/services/authentication'
import {getAuthDataFromLocal} from '../services/mobile';

class PasswordStore {

    constructor() {
        this.jwt = null;
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
        // check mobilePhone is register or not API
    }

}

export default alt.createStore(PasswordStore, 'PasswordStore')
