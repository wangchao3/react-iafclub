function isEmpty(s) {
    let str = (s || '').trim();
    if (!str.length)
        return true;
    return false;
}

function validateMobile(mobile) {
    if (isEmpty(mobile))
        return '请填写手机号码';
    if (!/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(mobile))
        return '手机号码格式错误';
    return null;
}

function validateEmail(email) {
    if (isEmpty(email))
        return '请填写邮箱地址';
    if (!/^[\w\d\-\.]+@[a-zA-Z0-9\-\.]+\.[a-zA-Z]+$/.test(email))
        return '邮箱格式错误';
    return null;
}

function validatePassword(password) {
    if (isEmpty(password))
        return '请填写密码';
    if (!/^.{6,20}$/.test(password))
        return '密码长度为6到20位';
    return null;
}

function validateCaptch(captch) {
    if (isEmpty(captch)) 
        return '请填写验证码';
    if (!/^[a-zA-Z0-9]{4}$/.test(captch))
        return '验证码错误';
    return null;
}

function validateSmsCode(code) {
    if (isEmpty(code))
        return '请短信验证码';
    if (!/^\d{6}$/.test(code))
        return '短信验证码错误';
    return null;
}

function validateChineseChar(char, label) {
    if (isEmpty(char))
        return '请填写' + label;
    if (!/^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test(char))
        return label + '错误，请使用中文填写';
    return null;
}

function validateChineseName(char, label) {
    if (isEmpty(char))
        return '请填写' + label;
    if (char.length > 4)
        return '姓名不得大于四位';
    if (!/^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test(char))
        return label + '错误，请使用中文填写';
    return null;
}

function validateAccount(account) {
    if (isEmpty(account))
        return '请填写手机号码/邮箱'
    if (/^\d+$/.test(account)) {
        return validateMobile(account);
    } else if (account.indexOf('@') > -1) {
        return validateEmail(account);
    } else {
        return '账号必须为手机号码或邮箱'
    }
    return null;
}

export default {
    validateMobile,
    validateEmail,
    validatePassword,
    validateCaptch,
    validateSmsCode,
    validateChineseChar,
    validateAccount,
    validateChineseName
}
