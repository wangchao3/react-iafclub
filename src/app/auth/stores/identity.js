import alt from '../../alt'
import IdentityActions from '../actions/identity'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getParameterByName} from '../../../utils/utils'
import {auth} from '../../common/services/authentication'
import {saveUserInfoToLocal} from '../services/userInfo'
import MessageActions from '../../../components/actions/message'

class IdentityStore {

    constructor() {
        this.banks = null;
        this.checkData = {};
        this.bindActions(IdentityActions);
    }

    onInitBank() {
        request.get(url.allBank).then((res) => {
            if (res.data.code !== '00000000') {
                MessageActions.show({message: res.data.msg});
            } else {
                this.banks = res.data.res;
                this.emitChange();
            }
        });
    }

    submit(payload) {
        if (!payload) return false;
        for (var i = 0; i < this.banks.length; i++) {
            if (payload.bank_name == this.banks[i].name) {
                payload.bank_key = this.banks[i].bank_key;
            }
        }
        console.log(payload);
        jsonRequest.post(url.identity, payload).then((res) => {
            if (res.data.code !== '00000000') {
                MessageActions.show({message: res.data.msg});
            } else {
                this.checkData = {
                    ticket: res.data.res.ticket,
                    api_user_id: res.data.res.api_user_id
                }
                this.emitChange();
            }
        });
    }

    checkPhone(code) {
        if (!code) return false;
        this.checkData.code = code;
        jsonRequest.post(url.smsIdentity, this.checkData).then((res) => {
            if (res.data.code !== '00000000') {
                MessageActions.show({message: res.data.msg});
            } else {
                window.location.href = '/my/home';
                this.emitChange();
            }
        });
    }

}

export default alt.createStore(IdentityStore, 'IdentityStore')
