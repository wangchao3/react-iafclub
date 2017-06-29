import t from 'tcomb-form'

export const Email = t.subtype(t.Str, function(s) {
    return /^[\w\d\-\.]+@[a-zA-Z0-9\-\.]+\.[a-zA-Z]+$/.test(s);
}, 'email')

export const Mobile = t.subtype(t.Str, function(s) {
    return /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(s);
}, 'mobile')

export const Password = t.subtype(t.Str, function(s) {
    return /^.{6,20}$/.test(s);
}, 'password')

export const Captcha = t.subtype(t.Str, function(s) {
    return /^[a-zA-Z0-9]{4}$/.test(s);
}, 'captcha')

export const SMSCode = t.subtype(t.Str, function(s) {
    return /^\d{4}$/.test(s);
}, 'smscode')

export const ChineseChar = t.subtype(t.Str, function(s) {
    return /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test(s);
}, 'chineseChar')

export const ChineseName = t.subtype(t.Str, function(s) {
    return /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test(s) && s.length <= 4;
}, 'chineseName')

export const Account = t.subtype(t.Str, function(s) {
    if(/^\d+$/.test(s)){
        return  /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(s);
    }else if(s.indexOf('@') > -1){
        return /^[\w\d\-\.]+@[a-zA-Z0-9\-\.]+\.[a-zA-Z]+$/.test(s);
    }
}, 'account')

export const Identification = t.subtype(t.Str, function(s) {
    return /(^\d{15}$)|(^\d{17}(\d|x))/i.test(s);
}, 'identification')