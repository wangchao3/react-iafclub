import alt from '../../alt'
import HomeActions from '../actions/home'
import {request} from '../../../utils/request'
import {errorHandle} from '../../common/services/error'
import Cookies from "js-cookie";

class HomeStore {

    constructor() {
        this.isActive = false;
        this.userInfo = null;
        this.bindActions(HomeActions);
    }

    onInit(payload) {
        const userId = Cookies.get("userId") || "";
        request
        .get('/jrrest/members/'+userId)
        .then((res) => {
            if (res.data.responseCode === "00") {
                this.userInfo = res.data.content;
            }else {
                alert(res.data.responseMessage);
            }
            this.emitChange();
        }).catch((error) => {
            return alert(error);
        })
    }

    toggleClass(status) {
        this.isActive = !status;
        this.emitChange();
    }

}

export default alt.createStore(HomeStore, 'HomeStore')
