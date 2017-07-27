import alt from '../../alt'
import AboutUsActions from '../actions/aboutUs'
import {request} from '../../../utils/request'
import {getJWT} from '../../common/services/authentication'
import {errorHandle} from '../../common/services/error'
import url from '../constants/url'

class AboutUsStore {

    constructor() {
        this.bindActions(AboutUsActions);
    }

    // onInit() {
    //     request.get(url.about_us).then((res) => {
    //         console.log(res);
    //
    //     });
    //
    // }
}

export default alt.createStore(AboutUsStore, 'AboutUsStore')
