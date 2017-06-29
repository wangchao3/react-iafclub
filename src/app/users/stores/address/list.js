import alt from '../../../alt';
import {request} from '../../../../utils/request';
import AddressListActions from '../../actions/address/list';
import {getJWT} from '../../../common/services/authentication';
import url from '../../constants/url';
import {getAddresses} from '../../services/address';

class AddressListStore {

    constructor() {
        this.addresses = null;
        this.address = null;
        this.selected = 0;
        this.showPrimaryOnly = false;
        this.bindActions(AddressListActions);
    }

    onFetch(payload) {
        this.showPrimaryOnly = payload.showPrimaryOnly;
        getAddresses().then((res) => {
            this.addresses = res.data.addressList;
            if(!this.addresses.length){
                this.address = 'NA';
                return this.emitChange();
            }
            this.address = this.getPrimaryAddress();
            if(payload.onSetDefault && typeof payload.onSetDefault === 'function') payload.onSetDefault(this.address);
            this.emitChange();
        })
        .catch((error)=> {
            this.addresses = [];
            return this.emitChange();
        })
    }

    onSetChosen(index) {
        this.selected = index;
        this.address = this.addresses.slice(index, index + 1)[0];
        this.showPrimaryOnly = true;
    }

    onShowAllAddress() {
        this.showPrimaryOnly = false;
        this.address = this.addresses.slice();

    }

    onSaveSuccess(address) {
        if(!this.addresses){
            this.adddresses = [];
            this.showPrimaryOnly = true;
        }
        this.addresses.push(address);
        this.address = address;
    }

    onDelete(index) {
        const id = this.addresses[index].id;
        const jwt = getJWT();
        request
        .post(url.address_delete, {addressId: id, jwt: jwt})
        .then((res) => {
            this.addresses.splice(index, 1);
            this.emitChange();
        })
    }

    getPrimaryAddress() {
        if(!this.addresses || !this.addresses.length) return false;
        let primaryAddress;
        this.addresses.map((address, index) => {
            if(address.default){
                this.selected = index;
                primaryAddress = [address];
            }
        });
        if(!primaryAddress){
            this.selected = this.addresses.length - 1;
            primaryAddress = this.addresses.slice(-1)[0];
        }
        return primaryAddress;
    }
}

export default alt.createStore(AddressListStore, 'AddressListStore');
