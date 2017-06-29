import alt from '../../alt'
import {request} from '../../../utils/request'
import ResetPassWordActions from '../actions/resetPassword'
import {errorHandle} from '../../common/services/error'
import url from '../constants/url'

class ResetPasswordStore {

    constructor() {
        this.success = false;
        this.bindActions(ResetPassWordActions);
    }

    onSubmit(payload) {
        request
            .post(url.reset_password, payload)
            .then((res) => {
                this.success = true;
                alert('密码修改成功');
                return this.emitChange();
            })
            .catch((error) => {
                alert("服务器错误，请重试");
            })
    }
}

export default alt.createStore(ResetPasswordStore, 'ResetPasswordStore')
