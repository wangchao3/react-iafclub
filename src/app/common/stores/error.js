import alt from '../../alt'
import ErrorHandlerActions from '../actions/error'

class ErrorHandlerStore {

    constructor() {
        this.err = null;

        this.bindActions(ErrorHandlerActions);
    }

    onActive(err){
        this.err = err;
    }

    onReset(){
        this.err = null;
    }
}

export default alt.createStore(ErrorHandlerStore, 'ErrorHandlerStore')