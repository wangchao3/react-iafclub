import alt from '../../alt'
import AdsActions from '../actions/ads'
import {request} from '../../../utils/request'
import url from '../constants/url'

class AdsStore {

    constructor() {
        this.banner = '';
        this.visible = false;
        this.bindActions(AdsActions)
    }

    onSetBanner(category) {
        if(!category) {
            this.visible = false;
            this.emitChange();
            return false;
        }
        request
            .get(url.ads, {params: {category: category}})
            .then((res) => {
                this.banner = res.data.data;
                this.visible = true;
                this.emitChange();
            })
    }
}

export default alt.createStore(AdsStore, 'AdsStore')
