import alt from '../../alt'
import UserInfoActions from '../actions/userInfo'
import {request, jsonRequest} from '../../../utils/request'
import url from '../constants/url'
import MessageActions from '../../../components/actions/message'

class UserInfoStore {

    constructor() {
        this.userInfo = '';
        this.time = new Date();
        this.job_time = '';
        this.job_time_recent = '';
        this.choose = 1;
        this.isOpen = false;
        this.success = false;
        this.bindActions(UserInfoActions);
    }

    init() {
        request.get(url.perinfo).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.userInfo = res.data.res;
            if(this.userInfo.job_time) this.job_time = this.userInfo.job_time;
            if(this.userInfo.job_time_recent) this.job_time_recent = this.userInfo.job_time_recent;
            this.emitChange();
        });
    }

    save(data) {
        if(!data) return false;
        jsonRequest.post(url.perinfosave, data).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.success = true;
            this.emitChange();
        });
    }

}

export default alt.createStore(UserInfoStore, 'UserInfoStore')
