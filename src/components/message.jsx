import React from 'react'
import MessageActions from './actions/message'
import MessageStore from './stores/message'
import alt from '../app/alt'
import styles from './styles/message'

export default React.createClass({

    getInitialState: function(){
        return MessageStore.getState();
    },

    componentDidMount: function(){
        MessageStore.listen(this.onChange);
    },

    componentWillUnmount: function(){
        MessageStore.unlisten(this.onChange);
        alt.recycle(MessageStore);
    },

    messageTimer: undefined,

    componentWillUpdate: function(nextProps, nextState) {
        if(nextState.visible){
            let timeout = nextState.timeout || this.state.timeout;
            if(this.messageTimer) clearTimeout(this.messageTimer);
            this.messageTimer = setTimeout(() => {
                MessageActions.hide();
            }, timeout);
        }
    },

    onChange: function(state){
        this.setState(state);
    },

    show: function(messagePayload){
        MessageActions.show(messagePayload);
    },

    hide: function(){
        MessageActions.hide()
    },

    render: function(){
        let visibleKlass = this.state.visible ? ' visible ' : ' '
        return (
            <div className={"global-message" + visibleKlass + this.state.type}>
                {this.state.message}
            </div>
        );
    }
})