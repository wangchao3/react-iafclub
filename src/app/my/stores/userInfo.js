import alt from '../../alt'
import UserInfoActions from '../actions/userInfo'
import {request, jsonRequest} from '../../../utils/request'
import url from '../constants/url'
import MessageActions from '../../../components/actions/message'

class UserInfoStore {

    constructor() {
        this.userInfo = '';
        this.time = new Date();
        this.isOpen = false;
        this.bindActions(UserInfoActions);
    }

    init() {
        request.get(url.perinfo).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.userInfo = res.data.res;
            this.emitChange();
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

export default alt.createStore(UserInfoStore, 'UserInfoStore')
