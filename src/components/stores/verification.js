import alt from '../../app/alt'
import VerificationActions from '../actions/verification'
import sendCode from '../services/sendCode'

class VerificationStore {

    constructor() {
        this.type = '短信'
        this.err = null;
        this.sendSuccess = null;
        this.bindActions(VerificationActions);
    }

    onSend(data) {
        if(!/^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(data.to)) return this.err = '手机号码错误';
        if(!/^[a-zA-Z0-9]{4}$/.test(data.captcha)) return this.err = '验证码错误';
        this.err = null;
        this.sendSuccess = null;
        sendCode(data).then(() => {
            this.sendSuccess = 1;
            this.emitChange();
        })
        .catch((err) => {
            this.err = err;
            this.emitChange();
        })
    }

    onSetType(type) {
        if(type !== '短信' && type !== '语音'){
            return console.warn('只能设置验证的方式为短信或语音');
        };
        this.type = type;
    }

    onResetError(){
        this.err = null;
    }

}

export default alt.createStore(VerificationStore, 'VerificationStore')
