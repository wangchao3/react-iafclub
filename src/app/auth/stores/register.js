import alt from '../../alt'
import RegisterActions from '../actions/register'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {hasLogin, authUserId, auth} from '../../common/services/authentication'
import {getRefererr} from '../../../app/common/services/app'
import MessageActions from '../../../components/actions/message'

class RegisterStore {

    constructor() {
        this.mobilePhone = null;
        this.bindActions(RegisterActions);
    }

    sendSms(phone) {
        let data = {};
        data.phone = phone;
        data.type = 10;
        request.post(url.sendSms, data).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.emitChange();
        });
    }

    onRegister(payload) {
        let registerData = {};
        registerData.password = payload.password;
        registerData.phone = payload.mobilePhone;
        registerData.sms_code = payload.verificationCode;
        registerData.type = 10;
        request.post(url.register, registerData).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.emitChange();
        })
    }

}

export default alt.createStore(RegisterStore, 'RegisterStore')
