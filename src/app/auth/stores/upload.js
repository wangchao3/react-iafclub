import alt from '../../alt'
import UploadActions from '../actions/upload'
import {jsonRequest, request} from '../../../utils/request'
import url from '../constants/url'
import {errorHandle} from '../../common/services/error'
import {getParameterByName} from '../../../utils/utils'
import {auth} from '../../common/services/authentication'
import {saveUserInfoToLocal} from '../services/userInfo'
import MessageActions from '../../../components/actions/message'

class UploadStore {

    constructor() {
        this.checkData = {};
        this.bindActions(UploadActions);
        this.dataset = {
            front: {
                type: 'image',
                label: '个人信息面',
                name: 'front',
                max: 5,
                isRequired: true,
                defaultValue: '/assets/images/perindex/identity-up.png',
            },
            back: {
                type: 'image',
                label: '国徽图案面',
                name: 'back',
                max: 5,
                isRequired: true,
                defaultValue: '/assets/images/perindex/identity-up.png',
            },
        };
    }

    submit(payload) {
        if (!payload) return false;
        for (var i = 0; i < this.banks.length; i++) {
            if (payload.bank_name == this.banks[i].name) {
                payload.bank_key = this.banks[i].bank_key;
            }
        }
        console.log(payload);
        jsonRequest.post(url.upload, payload).then((res) => {
            if (res.data.code !== '00000000') {
                MessageActions.show({message: res.data.msg});
            } else {
                this.checkData = {
                    ticket: res.data.res.ticket,
                    api_user_id: res.data.res.api_user_id
                }
                this.emitChange();
            }
        });
    }

}

export default alt.createStore(UploadStore, 'UploadStore')
