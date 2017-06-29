import {BASE_API_PATH} from '../../app/constants'

export default {
    captcha: '/api/captcha/captchaImage.png?r=' + Math.random(),
    verifications_sendcode: BASE_API_PATH + 'verification/sendCode',
    get_address_list: BASE_API_PATH + 'address/getAddressItem',
    caseAdd: BASE_API_PATH + 'userAuthentication/investmentCase/save',
    caseDelete: BASE_API_PATH + 'userAuthentication/investmentCase/del',
    address_default_url: BASE_API_PATH + "taxonomy/addressTree",
}
