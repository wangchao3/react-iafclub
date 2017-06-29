import alt from '../../app/alt'
import AddressActions from '../actions/address'
import {request} from '../../utils/request'
import url from '../constants/url'

class AddressStore {

	constructor() {
		this.loaded = false;
		this.data = {};
		this.error = null;
		this.depth = 3;
		this.defaultChar = ['省份', '城市', '区县'];
		this.setDefault();
		this.bindActions(AddressActions);
	}

	setDefault() {
		for(var i=0; i<this.depth; i++){
			this.data['depth' + i] = [{'id': -1, 'name': this.defaultChar[i]}]
			this['depth' + i] = -1;
		}
	}

	onSetError(error) {
		this.error = error;
	}

	onRecovery(locationId) {
		request
		.get(url.address_default_url + "?id=" + locationId)
		.then((res) => {
			this.loaded = true;
			this.data["depth0"] = [{'id': -1, 'name': this.defaultChar[0]}].concat(res.data.province);
			this.data["depth1"] = [{'id': -1, 'name': this.defaultChar[1]}].concat(res.data.city);
			if(res.data.district && res.data.district.length){
				this.data["depth2"] = [{'id': -1, 'name': this.defaultChar[2]}].concat(res.data.district);
			} else {
				delete this.data["depth2"];
			}
			this.setValue(res.data);
			this.emitChange()
		});
	}

	setValue(data) {
		data.province.map((item) => {
			if(item.isSelected) this.depth0 = item.id;
		})
		data.city.map((item) => {
			if(item.isSelected) this.depth1 = item.id;
		})
		if(data.district && data.district.length){
			data.district.map((item) => {
				if(item.isSelected) this.depth2 = item.id;
			})
		}
	}

	onFetch(payload) {
		if(!/^\-?\d+$/.test(payload.id)) return false;
		const depth = payload.depth;
		if(payload.id / 1 < 0 && depth < this.depth){
			this.data['depth' + depth] = [{'id': -1, 'name': this.defaultChar[depth]}];
			return this.emitChange();
		}
		request
		.post(url.get_address_list, {id: payload.id, depth: (depth === 0 ? 1 : depth)})
		.then((res) => {
			this.loaded = true;
			if(!res.data.item.children.length){
				delete this.data['depth' + depth];
			}else{
				let len = Object.keys(this.data).length;
				if(depth === len) len = len + 1;
				for(var i=depth; i<len; i++){
					const defaultOpt = [{'id': -1, 'name': this.defaultChar[i]}]
					const opts = i === depth ? defaultOpt.concat(res.data.item.children) : defaultOpt;
					this.data['depth' + i] = opts;
				}
			}
			this.emitChange();
		})
	}
}

export default alt.createStore(AddressStore, 'AddressStore');
