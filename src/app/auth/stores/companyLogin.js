import alt from '../../alt'
import CompanyLoginActions from '../actions/companyLogin'
import {request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'

class CompanyLoginStore {

    constructor() {
        this.bindActions(CompanyLoginActions);
    }

    onLogin(payload) {
        console.log(payload);
        // check mobilePhone is register or not API
    }

}

export default alt.createStore(CompanyLoginStore, 'CompanyLoginStore')
