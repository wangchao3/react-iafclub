import React from 'react'
import HeaderActions from '../../common/actions/header'
import LoanActions from '../actions/loan'
import LoanStore from '../stores/loan'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/loan'
import cx from 'classnames'
import {Link} from 'react-router'
import Select from '../../../components/selector'
import Input from '../../../components/input'
import {findDOMNode} from "react-dom";

export default React.createClass({

    getInitialState: function() {
        return LoanStore.getState();
    },

    componentDidMount: function() {
        LoanStore.listen(this.onChange);
        HeaderActions.setTitle('借款');
        LoanActions.init();
    },

    componentWillUnmount: function() {
        LoanStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        const info = this.state.info;
        if(!info) return (<Spinner />);
        console.log(info);
        let monthOptions = [], childOptions = [];
        for (var i = 0; i < info.loan_term.length; i++) {
            monthOptions.push(<option value={info.loan_term[i]} key={i}>{info.loan_term[i]}</option>);
        }
        return (
            <div className="loan body-container">
                <ul>
                    <li className="amountLi">
                        <label>借多少</label>
                        <input type="text" ref="amount" placeholder="请输入整数金额" className="amount" />
                    </li>
                    <li>
                        <label>借多久</label>
                        <Select options={monthOptions} ref="time" />
                    </li>
                    <li>
                        <label>怎么还</label>
                        <Select options={childOptions} ref="equalMoney" />
                    </li>
                </ul>
                <div className="size12 notice">具体以银行账单为准！</div>
                <div className="saveBtn">
                    <button className="btn btn-red btn-block" onClick={this.save}>保存修改</button>
                    <div className="size12 text-center">借款将直接转入常用银行卡</div>
                </div>
            </div>
        );
    },

    save: function(e) {
        e.preventDefault();
        const amount = findDOMNode(this.refs.amount).value.trim()
        const payload = {
            amount: amount,
        }
        console.log(payload);
        // LoanActions.save(payload);
    }
})
