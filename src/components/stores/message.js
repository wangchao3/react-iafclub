import alt from '../../app/alt'
import MessageActions from '../actions/message'

class MessageStore {

    constructor(){
        this.visible = false;
        this.type = 'default';
        this.timeout = 3000;
        this.callback = null;
        this.message = '';

        this.bindActions(MessageActions);
    }

    onShow(paylaod){
        this.visible = true;
        for(var k in paylaod){
            this[k] = paylaod[k];
        }
    }

    onHide(){
        this.visible = false;
    }
}

export default alt.createStore(MessageStore, 'MessageStore')