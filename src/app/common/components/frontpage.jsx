import React from 'react'
import HeaderActions from '../actions/header'
import {Link} from 'react-router'
import FrontpageActions from '../actions/frontpage'
import FrontpageStore from '../stores/frontpage'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/frontpage'

export default React.createClass({

    getInitialState: function() {
        return FrontpageStore.getState();
    },

    componentDidMount: function() {
        FrontpageStore.listen(this.onChange);
        HeaderActions.hide();
    },

    componentWillUnmount: function() {
        FrontpageStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        return (
            <div className="frontpage text-center">
                <img className="logo" src="/assets/images/index/login.png"/>
                <img className="figure1" src="/assets/images/index/figure1.png"/>
                <img className="figure2" src="/assets/images/index/figure2.png"/>
                <Link className="btn btn-block btn-outlined color-red border-red" to={`/user/login?type=20`}>企业用户</Link>
                <Link className="btn btn-block btn-red" to={`/user/login?type=10`}>个人用户</Link>
                <p className="size12 fixBottom">Copyright ©2017-2018 特华小贷保留所有权利</p>
            </div>
        );
    }
})
