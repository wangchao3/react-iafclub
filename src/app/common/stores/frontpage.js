import alt from '../../alt'
import FrontpageActions from '../actions/frontpage'
import {request} from '../../../utils/request'
import {getJWT} from '../../common/services/authentication'
import {errorHandle} from '../../common/services/error'
import url from '../constants/url'

class FrontpageStore {

    constructor() {
        this.banners = null;
        this.news = null;
        this.projects = [];
        this.bindActions(FrontpageActions);
    }

    // onGetBanner() {
    //     request
    //         .get(url.banner)
    //         .then((res) => {
    //             console.log(res);
                // this.banners = res.data.data;
                // this.emitChange();
    //         });
    // }
}

export default alt.createStore(FrontpageStore, 'FrontpageStore')
