import React from 'react'
import {Navigation, State, Link} from 'react-router'
import {isLogin} from '../../common/services/authentication'
import NavigationActions from '../actions/nav'
import NavigationStore from '../stores/nav'
import alt from '../../alt'

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState: function() {
        return NavigationStore.getState();
    },

    componentDidMount: function() {
        NavigationStore.listen(this.onChange);
    },

    componentWillUnmount: function() {
        NavigationStore.unlisten(this.onChange);
        alt.recycle(NavigationStore);
    },

    onChange: function(state) {
        this.setState(state);
    },

    goHome: function(event) {
        event.preventDefault();
        const {router} = this.context;
        if (isLogin())
            return router.push("/home");
        router.push("/login");
    },

    backAction: function(e) {
        e.preventDefault();
        if (this.state.action) {
            this.state.action();
            NavigationActions.resetAction();
            return undefined;
        }
        this.context.router.goBack();
    },

    render: function() {
        const path = location.pathname;
        if (path === '/' || path === '/my/home') {
            return (<span/>);
        } else {
            return <a href="#" className="iconfont nav-icon" onClick={this.backAction}>&#xe609;</a>
        }
    }

})
