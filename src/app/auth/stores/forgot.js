import alt from '../../alt'
import ForgotActions from '../actions/forgot'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {hasLogin, authUserId, auth} from '../../common/services/authentication'
import {getRefererr} from '../../../app/common/services/app'
import MessageActions from '../../../components/actions/message'
import {getParameterByName} from '../../../utils/utils'

class ForgotStore {

    constructor() {
        this.isRunning = false;
        this.type = getParameterByName('type') ? getParameterByName('type') : 10;
        this.bindActions(ForgotActions);
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

    onForgot(data) {
        data.type = this.type;
        console.log(data);
        request.post(url.resetpwd, data).then((res) => {
            if (res.data.code !== '00000000') return errorHandle(res.data.msg);
            MessageActions.show({message: '新密码设置成功，立即登录'});
            window.location.href = '/my/home';
            this.emitChange();
        })
    }

}

export default alt.createStore(ForgotStore, 'ForgotStore')
