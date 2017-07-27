import alt from '../../alt'
import HomeActions from '../actions/home'
import {request} from '../../../utils/request'
import url from '../../auth/constants/url'
import MessageActions from '../../../components/actions/message'
import Cookies from "js-cookie";

class HomeStore {

    constructor() {
        this.bindActions(HomeActions);
    }

    logout() {
        request.get(url.logout).then((res) => {
            if (res.data.code !== '00000000')
                MessageActions.show({message: res.data.msg});
            Cookies.remove("token");
            location.href = '/';
            this.emitChange();
        });
    }

}

export default alt.createStore(HomeStore, 'HomeStore')
