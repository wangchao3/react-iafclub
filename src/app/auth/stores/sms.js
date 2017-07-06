import alt from '../../alt'
import SmsActions from '../actions/sms'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getAuthDataFromLocal} from '../services/mobile'
var axios = require("axios");

class SmsStore {

    constructor() {
        this.imgCode = null;
        this.token = null;
        this.mobilePhone = null;
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
                this.token = data.content.token;
            }else {

            }
            this.emitChange();
        })
    }

    onLogin(payload) {
        console.log(payload);
        // check mobilePhone is register or not API
    }

    sendMessage(smsCode) {
        if(!this.token) return false;
        request
        .get('/jrrest/messages/imagecode/'+smsCode+'/'+this.token)
        .then((res) => {
            const data = res.data;
            if(data.responseCode === '00') {
                this.sendNow();
            }else {

            }
            this.emitChange();
        })
    }

    sendNow() {
        if(!this.mobilePhone) return false;
        const payload = {
            phone: this.mobilePhone,
            valid: "P2P_REG"
        }
        // jsonRequest
        // .post('/jrrest/messages/sms', payload)
        // .then((res) => {
        //     const data = res.data;
        //     if(data.responseCode === '00') {
        //
        //     }else {
        //
        //     }
        //     this.emitChange();
        // })
        // 坑爹的接口设计，验证验证码传个莫名其妙的token，下面代码不生效
        axios.post('/jrrest/messages/sms', payload, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Token": this.token,
            },
            responseType: "json",
        }).then((response)=>{
            var data = response.data;
            console.log(data);
        }, (error) => {

        })
    }

}

export default alt.createStore(SmsStore, 'SmsStore')
