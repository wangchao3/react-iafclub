import alt from '../../alt'
import ResetActions from '../actions/reset'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getParameterByName} from '../../../utils/utils'
import {auth} from '../../common/services/authentication'
import {saveUserInfoToLocal} from '../services/userInfo';
import MessageActions from '../../../components/actions/message';

class ResetStore {

    constructor() {
        this.bindActions(ResetActions);
    }

    onUpdate(payload) {
        if (!payload)
            return false;
        jsonRequest.post(url.reset, payload).then((res) => {
            if (res.data.code !== '00000000') {
                return alert(res.data.msg);
            } else {
                MessageActions.show({message: '修改成功'});
                window.location.href = '/my/home';
                this.emitChange();
            }
        });
    }

}

export default alt.createStore(ResetStore, 'ResetStore')
