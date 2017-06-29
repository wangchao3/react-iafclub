import alt from '../../../alt';
import CreateAddressActions from '../../actions/address/create'
import {request} from '../../../../utils/request'
import {getJWT} from '../../../common/services/authentication'
import url from '../../constants/url'

class CreateAddressStore {

    constructor() {
        this.address = null;
        this.bindActions(CreateAddressActions);
    }

    onCreate(payload) {
        const jwt = getJWT();
        if(!jwt) return false;
        payload.data.jwt = jwt;
        request
        .post(url.address_create, payload.data)
        .then((res) => {
            if(res.data.error !== 'NA') return alert(res.data.message);
            this.address = res.data.address;
            if(payload.next && typeof payload.next === 'function') payload.next(this.address);
            this.emitChange();
        })
    }
}

export default alt.createStore(CreateAddressStore, 'CreateAddressStore');
