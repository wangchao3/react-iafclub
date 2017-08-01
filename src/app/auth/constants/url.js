import {BASE_API_PATH} from '../../constants'

export default {
    personLogin : BASE_API_PATH + 'login/doin',
    sendSms : BASE_API_PATH + 'reg/sendsms',
    register : BASE_API_PATH + 'reg/beuser',
    modpwd : BASE_API_PATH + 'user/modpwd',
    resetpwd : BASE_API_PATH + 'login/resetpwd',
    logout : BASE_API_PATH + 'login/doexit',
    allBank : BASE_API_PATH + 'Tool/banks',
    identity : BASE_API_PATH + 'loan/identityValidated',
    smsIdentity : BASE_API_PATH + 'loan/phoneCodeValidated'
}
