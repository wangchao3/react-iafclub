import React from 'react'
import RegisterActions from '../actions/register'
import RegisterStore from '../stores/register'
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

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState: function() {
        return RegisterStore.getState();
    },

    componentDidMount: function() {
        const query = this.props.location.query;
        RegisterActions.initial(query);
        RegisterStore.listen(this.onChange);
        HeaderActions.setTitle('注册');
    },

    componentWillUpdate: function(nextProps, nextState) {
        if (nextState.err)
            this.refs.loading.hide();
        if (nextState.jwt)
            return location.replace("/home");
        if (!this.state.err && nextState.err || this.state.err !== nextState.err) {
            this.error = nextState.err;
        }
    },

    componentWillUnmount: function() {
        RegisterStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    onMobileUpdate: function(mobile) {
        this.setState({mobile: mobile});
    },

    render: function() {
        return (
            <div className="register" style={{
                minHeight: window.innerHeight - 44
            }}>
                <Header ref="header"/>
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <Input ref="mobilePhone" name="mobilePhone" placeholder="请填写手机号码" onValid={validator.validateMobile} label="手机号码" isRequired={true} onChange={this.onMobileUpdate}/>
                        <div className="input-group">
                            <Input ref="verificationCode" name="verificationCode" placeholder="请填写短信验证码" onValid={validator.validateSmsCode} label="短信验证码" isRequired={true}/>
                            <span className="btn btn-positive" onClick={this.showVerification}>获取验证码</span>
                        </div>
                        <Input type="password" ref="password" name="password" placeholder="请填写密码" onValid={validator.validatePassword} label="密码" isRequired={true}/>
                        <button className="btn btn-block btn-red" type="submit">注册</button>
                    </form>
                </div>
                <Verification ref="verification" mobile={this.state.mobile}/>
                <div className="terms-link text-center">
                    <p>轻触上面的注册按钮,即表示你同意</p>
                    <p>
                        <Link to="/page/terms">特华小贷注册协议</Link>
                    </p>
                </div>
                <LoadingComponent ref="loading"/>
            </div>
        );
    },

    onSubmit: function(e) {
        e.preventDefault();
        var value = {
            mobilePhone: this.refs.mobilePhone.getValue(),
            verificationCode: this.refs.verificationCode.getValue(),
            password: this.refs.password.getValue()
        };
        let isValid = true;
        for (var i in value) {
            if (!value[i])
                isValid = false;
            };
        if (!isValid)
            return undefined;
        const refererr = getRefererr();
        let data = JSON.parse(JSON.stringify(value))
        if (refererr) {
            data = objectAssign(data, refererr);
        }
        this.refs.loading.show();
        RegisterActions.register(data);
    },

    showVerification: function(e) {
        e.preventDefault();
        if (!this.refs.mobilePhone.getValue())
            return undefined;
        RegisterActions.sendSms(this.refs.mobilePhone.getValue());
    }
})
