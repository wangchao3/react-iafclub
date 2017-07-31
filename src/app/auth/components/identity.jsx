import React from 'react'
import IdentityStore from '../stores/identity'
import IdentityActions from '../actions/identity'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import alt from '../../alt'
import Header from '../../common/components/header'
import styles from '../styles/identity'
import Spinner from '../../../components/spinner'
import Select from '../../../components/selector'
import Verification from '../../../components/verification'
import Alert from '../../../components/alert'
import validator from '../../../utils/validator';
import {findDOMNode} from "react-dom";

export default React.createClass({

    getInitialState: function() {
        return IdentityStore.getState();
    },

    componentDidMount: function() {
        IdentityStore.listen(this.onChange);
        HeaderActions.setTitle('身份验证');
        IdentityActions.initBank();
    },

    componentWillUnmount: function() {
        IdentityStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        const banks = this.state.banks;
        if(!banks) return (<Spinner />)
        let options = [];
        for (var i = 0; i < banks.length; i++) {
            options.push(<option value={banks[i].name} key={i}>{banks[i].name}</option>);
        }
        return (
            <div className="identity">
                <Header ref="header"/>
                <div className="text-center text-notice">加油！完成后最高可获得10万的授权额度</div>
                <div className="logo">
                    <img src="/assets/images/perindex/identity.png" alt="logo"/>
                </div>
                <div className="input-group">
                    <div className="input-row">
                        <label>姓名</label>
                        <input type="text" placeholder="请输入" ref="name" />
                    </div>
                    <div className="input-row">
                        <label>身份证号</label>
                        <input type="email" placeholder="输入您的身份证号" ref="idCard" />
                    </div>
                    <div className="input-row">
                        <label>常用银行卡</label>
                        <input type="text" placeholder="输入您的卡号" ref="cardNo" />
                    </div>
                    <div className="input-row">
                        <label>开卡银行</label>
                        <Select options={options} ref="banks" />
                    </div>
                    <div className="input-row">
                        <label>银行卡绑定手机</label>
                        <input type="text" placeholder="输入手机号码" ref="cardPhone" />
                    </div>
                    <div className="input-row">
                        <label>手机验证码</label>
                        <input type="text" placeholder="输入验证码" ref="shortCode" />
                    </div>
                    <div className="p20">
                        <button className="btn btn-red btn-block btn-other" onClick={this.submit}>下一步</button>
                    </div>
                </div>
            </div>
        );
    },
    submit: function(e) {
        e.preventDefault();
        const card_name = this.refs.name.value;
        const bank_id_card = this.refs.idCard.value;
        const bank_card = this.refs.cardNo.value;
        const bank_card_phone = this.refs.cardPhone.value;
        const bank_name = this.refs.banks.getValue();
        const payload = {
            card_name: card_name,
            bank_id_card: bank_id_card,
            bank_card: bank_card,
            bank_card_phone: bank_card_phone,
            bank_name: bank_name,
        }
        IdentityActions.submit(payload);
    }
});
