import {BASE_API_PATH} from '../../constants'

export default {
    get_wechat_user_info: '/services/wechat/get_user_info',
    wechat_oauth: BASE_API_PATH + 'user/openAuth/login',
    wechat_bind: BASE_API_PATH + 'user/openAuth/addMap',
    wechat_register: BASE_API_PATH + 'user/openAuth/register',
}
