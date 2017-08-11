import React from 'react'
import FinanceStore from '../stores/finance'
import FinanceActions from '../actions/finance'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import alt from '../../alt'
import styles from '../styles/info'
import Input from "../../../components/form/text";
import validator from '../../../utils/validator';

export default React.createClass({

    getInitialState: function() {
        return FinanceStore.getState();
    },

    componentDidMount: function() {
        FinanceStore.listen(this.onChange);
        HeaderActions.show();
        HeaderActions.setTitle('财务信息');
    },

    componentWillUnmount: function() {
        FinanceStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        return (
            <div className="companyInfo body-container">
                <form onSubmit={this.onSubmit}>
                    <ul>
                        <Input type="liInput" ref="first_total_assets" name="first_total_assets" placeholder="元" label="近一期总资产" isRequired={true} />
                        <Input type="liInput" ref="first_total_liabilities" name="first_total_liabilities" placeholder="元" label="近一期总负债" isRequired={true} />
                        <Input type="liInput" ref="current_assets" name="current_assets" placeholder="元" label="近一期流动资金" isRequired={true} />
                        <Input type="liInput" ref="current_liabilities" name="current_liabilities" placeholder="元" label="近一期流动负债" isRequired={true} />
                        <Input type="liInput" ref="income" name="income" placeholder="元" label="近一期主营业务收入" isRequired={true}  />
                        <Input type="liInput" ref="cost" name="cost" placeholder="元" label="近一期主营业务成本" isRequired={true} />
                        <Input type="liInput" ref="cash_inflow" name="cash_inflow" placeholder="元" label="近一期经营性现金流入" isRequired={true} />
                        <Input type="liInput" ref="cash_outflow" name="cash_outflow" placeholder="元" label="近一期经营性现金流出" isRequired={true} />
                    </ul>
                    <div className="saveBtn">
                        <button className="btn btn-red btn-block" type="submit">下一步</button>
                    </div>
                </form>
            </div>
        );
    },

    onSubmit: function(e) {
        e.preventDefault();
        var value = {
            first_total_assets: this.refs.first_total_assets.getValue(),
            first_total_liabilities: this.refs.first_total_liabilities.getValue(),
            current_assets: this.refs.current_assets.getValue(),
            current_liabilities: this.refs.current_liabilities.getValue(),
            income: this.refs.income.getValue(),
            cost: this.refs.cost.getValue(),
            cash_inflow: this.refs.cash_inflow.getValue(),
            cash_outflow: this.refs.cash_outflow.getValue()
        };
        let isValid = true;
        for (var i in value) {
            if (!value[i]) isValid = false;
        };
        if (!isValid) return undefined;
        let data = JSON.parse(JSON.stringify(value));
        FinanceActions.submit(data);
    }
})
