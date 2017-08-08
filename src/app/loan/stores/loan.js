import alt from '../../alt'
import LoanActions from '../actions/loan'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {hasLogin, authUserId, auth} from '../../common/services/authentication'
import {getRefererr} from '../../../app/common/services/app'
import MessageActions from '../../../components/actions/message'
import {getParameterByName} from '../../../utils/utils'

class LoanStore {

    constructor() {
        this.isRunning = false;
        this.type = getParameterByName('type') ? getParameterByName('type') : 10;
        this.info = null;
        this.bindActions(LoanActions);
    }

    init() {
        request.get(url.loan_apply).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.info = res.data.res;
            this.emitChange();
        });
    }

}

export default alt.createStore(LoanStore, 'LoanStore')
