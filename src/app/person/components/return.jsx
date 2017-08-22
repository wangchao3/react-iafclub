import React from 'react'
import HeaderActions from '../../common/actions/header'
import ReturnActions from '../actions/return'
import ReturnStore from '../stores/return'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/return'
import cx from 'classnames'
import {Link} from 'react-router'
import Footer from '../../../components/footer'

export default React.createClass({

    getInitialState: function() {
        return ReturnStore.getState();
    },

    componentDidMount: function() {
        ReturnStore.listen(this.onChange);
        HeaderActions.setTitle('未结清借款');
        ReturnActions.init();
    },

    componentWillUnmount: function() {
        ReturnStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        const recordList = this.state.recordList;
        if(!recordList) return(<Spinner />);
        return (
            <div className="recordList body-container">
                <div className="bodyContent">
                    <Link className="btn btn-red btn-block" to={`/person/payments/record`}>提前还清欠款</Link>
                </div>
                <Footer name="return" type="person" />
            </div>
        );
    }
})
