import React from 'react'
import HeaderActions from '../../common/actions/header'
import IndexActions from '../actions/index'
import IndexStore from '../stores/index'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/index'
import cx from 'classnames'
import {Link} from 'react-router'
import Footer from '../../../components/footer'
import {getUserInfoFromLocal} from '../../auth/services/userInfo'

export default React.createClass({

    getInitialState: function() {
        return IndexStore.getState();
    },

    componentDidMount: function() {
        IndexStore.listen(this.onChange);
        HeaderActions.setTitle('特华小贷');
        IndexActions.init();
    },

    componentWillUnmount: function() {
        IndexStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        const userInfo = getUserInfoFromLocal('userInfo');
        const previewData = this.state.previewData;
        if(!previewData) return(<Spinner />);
        return (
            <div className="index body-container">
                <div className="bodyContent">
                    <h4>{userInfo.res.name},你好！</h4>
                    <p>提交资料可获得额度</p>
                    <div className="bank-card">
                        <img src="/assets/images/perindex/bg-card.png"/>
                        <p className="size12 applied-amount">已用额度</p>
                        <p className="has-borrow">{previewData.applied_amount}</p>
                        <p className="size12 available-amount">可用额度</p>
                        <p className="can-borrow">{previewData.available_amount}</p>
                    </div>
                    <Link className="btn btn-red btn-block" to={`/company/finance`}>授信</Link>
                    <div className="text-center block">
                        <Link to={`/pages/help`}>借款须知></Link>
                    </div>
                </div>
                <Footer name="borrow" type="company" />
            </div>
        );
    }
})
