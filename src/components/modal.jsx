import React from 'react'
import styles from './styles/modal'

export default React.createClass({

    propTypes: {
        title: React.PropTypes.string.isRequired,
        callback: React.PropTypes.func,
        static: React.PropTypes.bool
    },

    getInitialState: function(){
        return {visible: false}
    },

    onTouch() {
        if(this.props.static) return undefined;
        this.hide();
    },

    hide: function(){
        this.setState({visible: false});
        if(this.props.callback && typeof this.props.callback === 'function') this.props.callback('hide');
    },

    show: function(){
        this.setState({visible: true});
        if(this.props.callback && typeof this.props.callback === 'function') this.props.callback('show');
    },

    render: function(){
        let visibleKlass = this.state.visible ? ' visible' : '';
        return (
            <div className={"pop-modal " + this.props.className + visibleKlass}>
                <div className="mask" onTouchStart={this.onTouch}></div>
                <div className="modal-container">
                    <div className="modal-content">
                        <h4 className="modal-title">{this.props.title}</h4>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
})
