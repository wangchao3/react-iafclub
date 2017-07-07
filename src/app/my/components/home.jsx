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
        HeaderActions.setTitle('账户');
        HomeActions.init();
    },

    componentWillUnmount: function() {
        HomeStore.unlisten(this.onChange);
    },

    onChange: function(state){
        this.setState(state);
    },

    render: function(){
        const isActive = this.state.isActive;
        const userInfo = this.state.userInfo;
        if(!userInfo) return (<Spinner />);
        return(
            <div className="home">
                <Header ref="header" />
                <div className="body-content">
                    <ul className="table-view">
                        <li className="table-view-cell">
                            {isActive ? userInfo.realName : '你猜猜我的名字'}
                            <div className={cx("toggle", cx({'active': isActive}))} onClick={() => this.toggleActive(isActive)}>
                                <div className="toggle-handle"></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <Footer name="home"/>
            </div>
        );
    },

    toggleActive: function(data){
        HomeActions.toggleClass(data);
    }
})
