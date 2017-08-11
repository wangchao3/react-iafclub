import alt from '../../alt'
import InfoActions from '../actions/info'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getParameterByName} from '../../../utils/utils'
import {auth} from '../../common/services/authentication'
import MessageActions from '../../../components/actions/message'

class InfoStore {

    constructor() {
        this.bindActions(InfoActions);
    }

    onSubmit(payload) {
        if (!payload) return false;
        jsonRequest.post(url.info_save, payload).then((res) => {
            if (res.data.code !== '00000000') {
                MessageActions.show({message: res.data.msg});
            } else {
                window.location.href = '/company/index';
                this.emitChange();
            }
        });
    }

}

export default alt.createStore(InfoStore, 'InfoStore')
