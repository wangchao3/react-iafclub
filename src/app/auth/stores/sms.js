import alt from '../../alt'
import SmsActions from '../actions/sms'
import {request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getAuthDataFromLocal} from '../services/mobile'

class SmsStore {

    constructor() {
        this.imgCode = null;
        this.bindActions(SmsActions);
    }

    onInit() {
        const authBasicData = getAuthDataFromLocal('followOrgAuthData');
        if(!authBasicData) return false;
        this.mobilePhone = authBasicData.mobilePhone;
        request
        .get('/jrrest/messages/imagecode?width=60&height=25&phone='+this.mobilePhone)
        .then((res) => {
            const data = res.data;
            if(data.responseCode === '00') {
                this.imgCode = data.content.imageCode;
            }else {

            }
            this.emitChange();
        })
        this.emitChange();
    }

    onLogin(payload) {
        // check mobilePhone is register or not API
    }

    sendMessage() {
        
    }

}

export default alt.createStore(SmsStore, 'SmsStore')
