import alt from '../../alt'
import PhoneCheckActions from '../actions/phoneCheck'
import {request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getJWT, auth} from '../../common/services/authentication'
import {saveAuthDataToLocal} from '../services/mobile';

class PhoneCheckStore {

    constructor() {
        this.jwt = null;
        this.bindActions(PhoneCheckActions);
    }

    onCheck(payload) {
        console.log(payload);
        let timestamp=new Date().getTime();
        console.log(timestamp);
        if(!payload) return false;
        saveAuthDataToLocal('followOrgAuthData', payload);
        // check mobilePhone is register or not API
        request
        .get('/jrrest/users/'+payload.mobilePhone+'?'+timestamp)
        .then((res) => {
            const data = res.data;
            if(data.responseCode === '422.user.exists') {
                location.href = '/auth/password';
            }else {

            }
            this.emitChange();
        })
    }

}

export default alt.createStore(PhoneCheckStore, 'PhoneCheckStore')
