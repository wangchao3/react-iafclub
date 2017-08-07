import React from 'react'
import HeaderActions from '../../common/actions/header'
import PerActions from '../actions/per'
import PerStore from '../stores/per'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/per'
import Header from '../../common/components/header'
import cx from 'classnames'
import {Link} from 'react-router'
import Footer from '../../../components/footer'
import {getUserInfoFromLocal} from '../../auth/services/userInfo'

export default React.createClass({

    getInitialState: function() {
        return PerStore.getState();
    },

    componentDidMount: function() {
        PerStore.listen(this.onChange);
        HeaderActions.setTitle('特华小贷');
        PerActions.init();
    },

    componentWillUnmount: function() {
        PerStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        const userInfo = getUserInfoFromLocal('userInfo');
        const previewData = this.state.previewData;
        if(!previewData) return(<Spinner />);
        return (
            <div className="perindex">
                <Header ref="header"/>
                <div className="bodyContent">
                    <h4>{userInfo.res.name},你好！</h4>
                    <div>总额度</div>
                    <h4>{previewData.credit_amount}</h4>
                    <div className="bank-card">
                        <img src="/assets/images/perindex/bg-card.png"/>
                        <p className="size12 applied-amount">已用额度</p>
                        <p className="has-borrow">{previewData.applied_amount}</p>
                        <p className="size12 available-amount">可用额度</p>
                        <p className="can-borrow">{previewData.available_amount}</p>
                    </div>
                    <Link className="btn btn-red btn-block">借一笔钱</Link>
                    <div className="text-center block">
                        <Link to={`/pages/help`}>借款须知></Link>
                    </div>
                </div>
                <Footer name="borrow"/>
            </div>
        );
    }
})
