import alt from '../../alt';
import WechatShareActions from "../actions/share";

class WechatShareStore {

    constructor() {
        this.visible = false;
        this.bindActions(WechatShareActions);
    }

    onShow() {
        this.visible = true;
    }

    onHide() {
        this.visible = false;
    }
}

export default alt.createStore(WechatShareStore, "WechatShareStore");
