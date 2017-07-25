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
import {Link} from 'react-router'
import {getUserInfoFromLocal} from '../../auth/services/userInfo'

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
        const userInfo = getUserInfoFromLocal('userInfo');
        console.log(userInfo);
        return (
            <div className="home">
                <Header ref="header"/>
                <ul className="table-view j-table-view">
                    <li className="table-view-cell">
                        <Link className="navigate-right">
                            <div className="user">
                                <img src="/assets/images/perindex/head.png"/>
                                <h1>
                                    <span className="left-des">{userInfo.res.name}{userInfo.res.phone}</span>
                                    <span className="right-des">个人信息</span>
                                </h1>
                            </div>
                        </Link>
                    </li>
                </ul>
                <ul className="table-view">
                    <li className="table-view-cell">
                        <Link className="navigate-right">我的借钱记录</Link>
                    </li>
                </ul>
                <ul className="table-view">
                    <li className="table-view-cell">
                        <Link className="navigate-right">账户安全</Link>
                    </li>
                </ul>
                <ul className="table-view">
                    <li className="table-view-cell">
                        <Link className="navigate-right">帮助中心</Link>
                    </li>
                </ul>
                <ul className="table-view">
                    <li className="table-view-cell">
                        <Link className="navigate-right">关于特华小贷</Link>
                    </li>
                </ul>
                <div className="logout">
                    <button className="logout-btn" onClick={this.logout}>退出登录</button>
                </div>
                <Footer name="home"/>
            </div>
        );
    },

    toggleActive: function(data) {
        HomeActions.toggleClass(data);
    }
})
