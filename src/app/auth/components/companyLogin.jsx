import React from 'react'
import CompanyLoginStore from '../stores/companyLogin'
import CompanyLoginActions from '../actions/companyLogin'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import alt from '../../alt'
import Header from '../../common/components/header'
import styles from '../styles/auth'
import Form from "../../../components/form/form";

export default React.createClass({

    getInitialState: function() {
        return CompanyLoginStore.getState();
    },

    componentDidMount: function() {
        CompanyLoginStore.listen(this.onChange);
        HeaderActions.setTitle('企业登录');
    },

    componentWillUnmount: function() {
        CompanyLoginStore.unlisten(this.onChange);
    },

    onChange: function(state){
        this.setState(state);
    },

    render: function(){
        const dataset = {
            name: {
                type: "text",
                name: "name",
                isRequired: true,
                placeholder: "请输入手机号/用户名",
                label: "账号",
            },
            password: {
                type: "password",
                name: "password",
                isRequired: true,
                placeholder: "请输入密码",
                label: "密码",
            }
        }
        return(
            <div className="auth">
                <Header ref="header" />
                <div className="logo">
                    <img src="/assets/images/logo.png" alt="logo" />
                </div>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="item text-nav p16">企业登录</div>
                    <Form dataset={dataset} ref="form" />
                    <div className="p16">
                        <button className="btn btn-red btn-block btn-radius" type="submit">下一步</button>
                    </div>
                    <div className="userLogin">
                        <p className="text-center"><Link to="/auth/phone_check">个人登录</Link></p>
                    </div>
                </form>
            </div>
        );
    },

    onSubmit: function(e){
        e.preventDefault();
        const data = this.refs.form.getValue();
        if(data.isInvalid) return undefined;
        CompanyLoginActions.check(data.value);
    }
})
