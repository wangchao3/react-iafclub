import alt from '../../alt'
import LoginActions from '../actions/login'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getParameterByName} from '../../../utils/utils'
import {auth} from '../../common/services/authentication'
import {saveUserInfoToLocal} from '../services/userInfo'
import MessageActions from '../../../components/actions/message'

class LoginStore {

    constructor() {
        this.bindActions(LoginActions);
    }

    onLogin(payload) {
        if (!payload) return false;
        let data = {};
        data.type = getParameterByName('type') ? getParameterByName('type') : 10;
        data.password = payload.password;
        data.phone = payload.phone;
        jsonRequest.post(url.login, data).then((res) => {
            if (res.data.code !== '00000000') {
                MessageActions.show({message: res.data.msg});
            } else {
                console.log(res.data.res);
                auth(res.data.res.token);
                saveUserInfoToLocal('userInfo', res.data);
                if (data.type == 20) {
                    window.location.href = '/company/index';
                }else {
                    window.location.href = '/per/index';
                }
                this.emitChange();
            }
        });
    }

}

export default alt.createStore(LoginStore, 'LoginStore')
