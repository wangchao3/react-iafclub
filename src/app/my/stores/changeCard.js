import alt from '../../alt'
import ChangeCardActions from '../actions/changeCard'
import {request, jsonRequest} from '../../../utils/request'
import url from '../constants/url'
import MessageActions from '../../../components/actions/message'

class ChangeCardStore {

    constructor() {
        this.userInfo = '';
        this.banks = '';
        this.bindActions(ChangeCardActions);
    }

    init() {
        request.get(url.perinfo).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.userInfo = res.data.res;
            this.emitChange();
        });
    }

    onInitBank() {
        request.get(url.allBank).then((res) => {
            if (res.data.code !== '00000000') {
                MessageActions.show({message: res.data.msg});
            } else {
                this.banks = res.data.res;
                this.emitChange();
            }
        });
    }

    save(data) {
        if(!data) return false;
        jsonRequest.post(url.perinfosave, data).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            MessageActions.show({message: '保存成功'});
            this.emitChange();
        });
    }

}

export default alt.createStore(ChangeCardStore, 'ChangeCardStore')
