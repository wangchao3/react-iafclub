import React from 'react'
import PasswordStore from '../stores/password'
import PasswordActions from '../actions/password'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import alt from '../../alt'
import Header from '../../common/components/header'
import styles from '../styles/auth'
import Form from "../../../components/form/form";

export default React.createClass({

    getInitialState: function() {
        return PasswordStore.getState();
    },

    componentDidMount: function() {
        PasswordStore.listen(this.onChange);
        HeaderActions.setTitle('登录');
        PasswordActions.init();
    },

    componentWillUnmount: function() {
        PasswordStore.unlisten(this.onChange);
    },

    onChange: function(state){
        this.setState(state);
    },

    render: function(){
        const dataset = {
            password: {
                type: "password",
                name: "password",
                isRequired: true,
                placeholder: "请输入登录密码",
                label: "登录密码",
            }
        }
        return(
            <div className="auth">
                <Header ref="header" />
                <div className="logo">
                    <img src="/assets/images/logo.png" alt="logo" />
                </div>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="item p16 password-notice">手机号码<span className="yellow">{this.state.mobilePhone}</span>已注册，请输入密码登录</div>
                    <Form dataset={dataset} ref="form" />
                    <div className="p16">
                        <button className="btn btn-red btn-block btn-radius" type="submit">登录</button>
                    </div>
                    <div className="userLogin">
                        <p className="text-center"><Link to="/auth/phone_check">忘记密码？点击找回</Link></p>
                    </div>
                </form>
            </div>
        );
    },

    onSubmit: function(e){
        e.preventDefault();
        const data = this.refs.form.getValue();
        if(data.isInvalid) return undefined;
        PasswordActions.login(data.value);
    }
})
