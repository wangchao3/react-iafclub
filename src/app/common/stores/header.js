import alt from '../../alt'
import HeaderActions from '../actions/header'

class HeaderStore {

    constructor() {
        this.title = '';
        this.visible = true;
        this.bindActions(HeaderActions)
    }

    onSetTitle(title) {
        this.title = title
    }

    onHide(){
        this.visible = false;
    }

    onShow(){
        this.visible = true;
    }
}

export default alt.createStore(HeaderStore, 'HeaderStore')