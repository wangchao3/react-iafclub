import alt from '../../alt'
import RecordActions from '../actions/record'
import {request, jsonRequest} from '../../../utils/request'
import url from '../constants/url'
import MessageActions from '../../../components/actions/message'

class RecordStore {

    constructor() {
        this.recordList = [
            {"amount": 1000, "last": 1000},
            {"amount": 3000, "last": 2000},
            {"amount": 5000, "last": 3000}
        ];
        this.bindActions(RecordActions);
    }

    init() {
        // request.get(url.record_list).then((res) => {
        //     if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
        //     this.recordList = res.data.res;
        //     this.emitChange();
        // });
    }

}

export default alt.createStore(RecordStore, 'RecordStore')
