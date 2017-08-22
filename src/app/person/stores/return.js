import alt from '../../alt'
import ReturnActions from '../actions/return'
import {request, jsonRequest} from '../../../utils/request'
import url from '../constants/url'
import MessageActions from '../../../components/actions/message'

class ReturnStore {

    constructor() {
        this.recordList = null;
        this.bindActions(ReturnActions);
    }

    init() {
        request.get(url.record_list).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.recordList = res.data.res;
            this.emitChange();
        });
    }

}

export default alt.createStore(ReturnStore, 'ReturnStore')
