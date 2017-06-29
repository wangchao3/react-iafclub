import {request} from '../../utils/request'
import url from '../constants/url'

export default function sendCode(data){
    return new Promise((resolve, reject) => {
        if(!/^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(data.to)) return reject('手机号码错误');
        if(!data.captcha) return reject('请填写验证码');
        request
        .post(url.verifications_sendcode, data)
        .then(function(res){
            const body = res.data;
            const message = body.error !== 'NA' ? body.message : null;
            if(message) return reject(new Error(message));
            return resolve()
        })
        .catch(reject);
    })
}
