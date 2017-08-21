import alt from '../../alt'
import PerActions from '../actions/per'
import {request, jsonRequest} from '../../../utils/request'
import url from '../constants/url'
import MessageActions from '../../../components/actions/message'

class PerStore {

    constructor() {
        this.previewData = '';
        this.bindActions(PerActions);
    }

    init() {
        request.get(url.applyPreview).then((res) => {
            if (res.data.code !== '00000000') MessageActions.show({message: res.data.msg});
            this.previewData = res.data.res;
            this.emitChange();
        });
    }

}

export default alt.createStore(PerStore, 'PerStore')
