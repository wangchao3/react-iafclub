import alt from '../../alt'
import NavigationActions from '../actions/nav'

class NavigationStore {

    constructor() {
        this.action = null;

        this.bindActions(NavigationActions);
    }

    onSetAction(action){
        this.action = action;
    }

    onResetAction() {
        this.action = null;
    }
}

export default alt.createStore(NavigationStore, 'NavigationStore')