import alt from '../../alt'
import RegisterActions from '../actions/register'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {hasLogin, authUserId, auth} from '../../common/services/authentication'
import MessageActions from '../../../components/actions/message'
import {getParameterByName} from '../../../utils/utils'

class RegisterStore {

    constructor() {
        this.mobilePhone = null;
        this.type = getParameterByName('type') ? getParameterByName('type') : 10;
        this.bindActions(RegisterActions);
    }

    sendSms(phone) {
        let data = {};
        data.phone = phone;
        data.type = this.type;
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
        registerData.type = this.type;
        request.post(url.register, registerData).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.emitChange();
        })
    }

}

export default alt.createStore(RegisterStore, 'RegisterStore')
