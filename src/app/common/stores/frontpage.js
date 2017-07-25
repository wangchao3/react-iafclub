import alt from '../../alt'
import FrontpageActions from '../actions/frontpage'
import {request} from '../../../utils/request'
import {getJWT} from '../../common/services/authentication'
import {errorHandle} from '../../common/services/error'
import url from '../constants/url'

class FrontpageStore {

    constructor() {
        this.bindActions(FrontpageActions);
    }
}

export default alt.createStore(FrontpageStore, 'FrontpageStore')
