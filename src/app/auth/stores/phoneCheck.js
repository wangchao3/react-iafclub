import alt from '../../alt'
import PhoneCheckActions from '../actions/phoneCheck'
import {request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {saveAuthDataToLocal} from '../services/mobile';

class PhoneCheckStore {

    constructor() {
        this.bindActions(PhoneCheckActions);
    }

    onCheck(payload) {
        let timestamp = new Date().getTime();
        const referer = location.search;
        if(!payload) return false;
        saveAuthDataToLocal('followOrgAuthData', payload);
        request
        .get('/jrrest/users/'+payload.mobilePhone+'?'+timestamp)
        .then((res) => {
            const data = res.data;
            if(data.responseCode === '422.user.exists') {
                location.href = '/auth/password'+referer;
            }else {
                location.href = '/auth/sms_notification'+referer;
            }
            this.emitChange();
        })
    }

}

export default alt.createStore(PhoneCheckStore, 'PhoneCheckStore')
