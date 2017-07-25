import React from 'react'
import HeaderActions from '../../common/actions/header'
import HomeActions from '../actions/home'
import HomeStore from '../stores/home'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/home'
import Footer from '../../../components/footer'
import Header from '../../common/components/header'
import cx from 'classnames'

export default React.createClass({

    getInitialState: function() {
        return HomeStore.getState();
    },

    componentDidMount: function() {
        HomeStore.listen(this.onChange);
        HeaderActions.setTitle('我的');
        HomeActions.init();
    },

    componentWillUnmount: function() {
        HomeStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        return (
            <div className="home">
                <Header ref="header"/>

                <Footer name="home"/>
            </div>
        );
    },

    toggleActive: function(data) {
        HomeActions.toggleClass(data);
    }
})
