import React from 'react'
import PhoneCheckStore from '../stores/phoneCheck'
import PhoneCheckActions from '../actions/phoneCheck'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import alt from '../../alt'
import Header from '../../common/components/header'
import styles from '../styles/auth'
import Form from "../../../components/form/form";

export default React.createClass({

    getInitialState: function() {
        return PhoneCheckStore.getState();
    },

    componentDidMount: function() {
        PhoneCheckStore.listen(this.onChange);
        HeaderActions.setTitle('手机号');
    },

    componentWillUnmount: function() {
        PhoneCheckStore.unlisten(this.onChange);
    },

    onChange: function(state){
        this.setState(state);
    },

    render: function(){
        const companyLoginUrl = `/auth/company_login${location.search}`;
        const dataset = {
            mobilePhone: {
                type: "text",
                name: "mobilePhone",
                isRequired: true,
                placeholder: "请输入您的手机号",
                label: "手机号",
                regex: /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
            }
        }
        return(
            <div className="auth">
                <Header ref="header" />
                <div className="logo">
                    <img src="/assets/images/logo.png" alt="logo" />
                </div>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="item text-nav p16">限登录后浏览，请输入手机号绑定或注册</div>
                    <Form dataset={dataset} ref="form" />
                    <div className="item text-comment p16"><small>我们不会在任何情况下泄露您的手机号，请放心填写</small></div>
                    <div className="p16">
                        <button className="btn btn-red btn-block btn-radius" type="submit">下一步</button>
                    </div>
                    <div className="companyLogin">
                        <p className="text-center"><Link to={companyLoginUrl}>企业登录</Link></p>
                    </div>
                </form>
            </div>
        );
    },

    onSubmit: function(e){
        e.preventDefault();
        const data = this.refs.form.getValue();
        if(data.isInvalid) return undefined;
        PhoneCheckActions.check(data.value);
    }
})
