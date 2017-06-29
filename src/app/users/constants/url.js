import {BASE_API_PATH} from '../../constants'

export default {
    login: BASE_API_PATH + 'user/login',
    register: BASE_API_PATH + 'user/register',
    action_new: BASE_API_PATH + 'userAction/new',
    reset_password: BASE_API_PATH + 'user/resetPassword/byMobilePhone',
    address_list: BASE_API_PATH + 'address/list',
    address_create: BASE_API_PATH + 'address/save',
    address_delete: BASE_API_PATH + 'address/remove',
    login_bind: BASE_API_PATH + 'user/openAuth/addMap',
    register_bind: BASE_API_PATH + 'user/openAuth/register',
}
