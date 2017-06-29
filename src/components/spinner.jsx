import React from 'react'
import styles from './styles/spinner'
import cx from 'classnames'

export default React.createClass({

    getInitialState: function() {
        return {
            visible: true
        };
    },

    render: function(){
        const visible = cx({'hide': !this.state.visible})
        return (
            <div className={cx("loading-spinner", visible)}>
              <div className="loading-bar bar0"></div>
              <div className="loading-bar bar1"></div>
              <div className="loading-bar bar2"></div>
              <div className="loading-bar bar3"></div>
            </div>
        );
    },

    hide: function(){
        this.setState({visible: false});
    },

    show: function(){
        this.setState({visible: true});
    }
})
