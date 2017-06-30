import alt from '../../alt'
import PhoneCheckActions from '../actions/phoneCheck'
import {request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getJWT, auth} from '../../common/services/authentication'

class PhoneCheckStore {

    constructor() {
        this.jwt = null;
        this.bindActions(PhoneCheckActions);
    }

    onCheck(payload) {
        console.log(payload);
        // check mobilePhone is register or not API
    }

}

export default alt.createStore(PhoneCheckStore, 'PhoneCheckStore')
