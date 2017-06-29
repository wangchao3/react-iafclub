import React from 'react'
import Modal from './modal'
import style from './styles/alert'

export default React.createClass({
    propTypes: {
        callback: React.PropTypes.func,
    },

    getInitialState: function() {
        return {
            message: null,
        };
    },

    render: function(){
        return (
            <Modal title='温馨提示' ref="container" className="alert" static={true}>
                <div className="message text-center">{this.state.message}</div>
                <button className="btn btn-block btn-primary dismiss-btn" onClick={this.dismiss}>确定</button>
            </Modal>
        )
    },

    hide: function(){
        this.refs.container.hide();
    },

    show: function(message){
        this.setState({message: message}, this.refs.container.show);
    },

    dismiss: function(){
        this.hide();
        if(this.props.callback && typeof this.props.callback === 'function') this.props.callback();
    }
})
