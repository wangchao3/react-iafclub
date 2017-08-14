import alt from '../../alt'
import FinanceActions from '../actions/finance'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getParameterByName} from '../../../utils/utils'
import {auth} from '../../common/services/authentication'
import MessageActions from '../../../components/actions/message'

class FinanceStore {

    constructor() {
        this.bindActions(FinanceActions);
    }

    update(payload) {
        if (!payload) return false;
        jsonRequest.post(url.finance_save, payload).then((res) => {
            if (res.data.code !== '00000000') {
                MessageActions.show({message: res.data.msg});
            } else {
                window.location.href = '/company/index';
                this.emitChange();
            }
        });
    }

}

export default alt.createStore(FinanceStore, 'FinanceStore')
