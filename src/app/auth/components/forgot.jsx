import React from 'react'
import ForgotActions from '../actions/forgot'
import ForgotStore from '../stores/forgot'
import HeaderActions from '../../common/actions/header'
import Verification from '../../../components/verification'
import Alert from '../../../components/alert'
import validator from '../../../utils/validator';
import {Link} from 'react-router'
import {isLogin} from '../../common/services/authentication'
import LoadingComponent from './loading'
import styles from '../styles/register'
import {getRefererr} from '../../common/services/app';
import objectAssign from 'object-assign';
import Input from "../../../components/form/text";
import Form from '../../../components/form/form'
import Header from '../../common/components/header'
import $ from "jquery"

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState: function() {
        return ForgotStore.getState();
    },

    componentDidMount: function() {
        ForgotStore.listen(this.onChange);
        HeaderActions.setTitle('忘记密码');
    },

    componentWillUnmount: function() {
        ForgotStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        // console.log(this.state.isRunning);
        let html = <span className="btn btn-positive" onClick={this.showVerification}>获取验证码</span>;
        if (this.state.isRunning)
            html = <span className="btn btn-outlined">获取验证码</span>;
        return (
            <div className="register" style={{
                minHeight: window.innerHeight - 44
            }}>
                <Header ref="header"/>
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <Input ref="cellphone" name="cellphone" placeholder="请输入您的手机号码" onValid={validator.validateMobile} label="手机号码" isRequired={true}/>
                        <div className="input-group">
                            <Input ref="sms_code" name="sms_code" placeholder="输入验证码" onValid={validator.validateSmsCode} label="短信验证码" isRequired={true}/> {html}
                        </div>
                        <Input type="password" ref="pwd" name="pwd" placeholder="输入新密码" onValid={validator.validatePassword} label="密码" isRequired={true}/>
                        <button className="btn btn-block btn-red" type="submit">确定</button>
                    </form>
                </div>
                <Verification ref="verification" mobile={this.state.mobile}/>
                <LoadingComponent ref="loading"/>
            </div>
        );
    },

    onSubmit: function(e) {
        e.preventDefault();
        var value = {
            cellphone: this.refs.cellphone.getValue(),
            sms_code: this.refs.sms_code.getValue(),
            pwd: this.refs.pwd.getValue()
        };
        let isValid = true;
        for (var i in value) {
            if (!value[i])
                isValid = false;
            };
        if (!isValid)
            return undefined;
        let data = JSON.parse(JSON.stringify(value))
        this.refs.loading.show();
        console.log(data);
        ForgotActions.forgot(data);
    },

    showVerification: function(e) {
        e.preventDefault();
        if (!this.refs.cellphone.getValue())
            return undefined;

        // this.setState({
        //     isRunning: true
        // }, () => {})
        const node = $(e.target);
        let countdownNumber = 60;
        node.attr('disabled', 'disabled').addClass('btn-outlined').removeClass('btn-positive');
        const countdown = setInterval(function() {
            if (countdownNumber <= 0) {
                node.removeAttr('disabled').html('重新发送').addClass('btn-positive').removeClass('btn-outlined');
                return clearInterval(countdown);
            }
            countdownNumber -= 1;
            return node.html(countdownNumber + 's后重新发送');
        }, 1000);
        ForgotActions.sendSms(this.refs.cellphone.getValue());
    }
})
