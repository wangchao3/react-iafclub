import alt from '../../alt'
import LoanActions from '../actions/loan'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {hasLogin, authUserId, auth} from '../../common/services/authentication'
import {getRefererr} from '../../../app/common/services/app'
import MessageActions from '../../../components/actions/message'
import {getParameterByName} from '../../../utils/utils'

class LoanStore {

    constructor() {
        this.isRunning = false;
        this.typeName = '月';
        this.type = 10;
        this.info = null;
        this.toPay = null;
        this.loanTermFlag = 10;
        this.loanAmt = 1000;
        this.loanTerm = 12;
        this.bindActions(LoanActions);
    }

    init() {
        request.get(url.loan_apply).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.info = res.data.res;
            this.type = this.info.loan_term_type;
            if (this.type !== 10) this.typeName = '天';
            if (this.type == 10) this.loanTermFlag = 20;
            this.change();
            this.emitChange();
        });
    }

    change(payload) {
        if (payload) {
            this.loanAmt = payload.amount;
            this.loanTerm = payload.howLong
        }
        const data = {
            calculateType: "10",
            loanAmt: this.loanAmt*100,
            loanRate: this.info.year_rate*100,
            loanTerm: this.loanTerm,
            loanTermFlag: this.loanTermFlag,
            paymentMethod: "RPT000010",
            startDate: new Date().getTime()
        }
        jsonRequest.post(url.calculator, data).then((res) => {
            if (res.data.responseCode !== '00') MessageActions.show({message: res.data.responseMessage});
            this.toPay = res.data.content;
            this.emitChange();
        })
    }

}

export default alt.createStore(LoanStore, 'LoanStore')
