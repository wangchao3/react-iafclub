import React from 'react';
import {findDOMNode} from "react-dom";
import Message from '../components/message'
import styles from './common/styles/app'
import {State} from 'react-router'
import cx from 'classnames'
import ErrorHandlerActions from './common/actions/error'
import ErrorHandlerStore from './common/stores/error'
import ErrorPage from './pages/components/500'
import NotFoundPage from './pages/components/404'
import Cookies from "js-cookie";
import Header from './common/components/header'
import {getParameterByName} from '../utils/utils'

export default React.createClass({

    getInitialState: function() {
        return ErrorHandlerStore.getState();
    },

    componentDidMount: function() {
        const {inviteUID} = this.props.location.query;
        if(inviteUID) Cookies.set("inviteUID", inviteUID, { expires: 365 });
        ErrorHandlerStore.listen(this.onChange);
    },

    componentWillUpdate: function(nextProps, nextState) {
        // const app = findDOMNode(this.refs.app);
        // if(app) app.className = app.className.replace(' active', '');
    },

    componentWillUnmount: function() {
        ErrorHandlerStore.unlisten(this.onChange);
    },

    componentDidUpdate: function(prevProps, prevState) {
        if(prevState.err) return ErrorHandlerActions.reset();
        const app = findDOMNode(this.refs.app);
        if(app) setTimeout(function(){app.className += ' active';}, 10);
    },

    onChange: function(state){
        this.setState(state);
    },

    render: function(){
        console.log(location.pathname);
        const isIndex = location.pathname === '/';
        console.log(isIndex);
        const content = (() => {
            if(this.state.err){
                if(this.state.err === 404) return (<NotFoundPage />);
                return (<ErrorPage />);
            }
            return (
                <div className={cx("amount-content", cx({'indexBg': isIndex}))} ref="app" style={{minHeight: window.innerHeight - 44}}>
                    {this.props.children}
                </div>
            );
        })()
        return (
            <div>
                <Header ref="header" />
                {content}
                <Message />
            </div>
        );
    }
})
