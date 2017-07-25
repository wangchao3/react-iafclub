import React from 'react'
import Spinner from '../../../components/spinner'
import cx from 'classnames'
import styles from '../styles/loading'

export default React.createClass({

    getInitialState: function() {
        return {visible: false};
    },

    render: function() {
        const classnames = cx({'visible': this.state.visible});
        return (
            <div className={cx("loading-cpn", classnames)}>
                <Spinner/>
            </div>
        );
    },

    componentWillUnmount: function() {
        this.hide();
    },

    hide: function() {
        this.setState({visible: false});
    },

    show: function() {
        this.setState({visible: true});
    }
})
