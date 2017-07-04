import React from 'react'
import SmsStore from '../stores/sms'
import SmsActions from '../actions/sms'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import alt from '../../alt'
import Header from '../../common/components/header'
import styles from '../styles/auth'
import Form from "../../../components/form/form";
import Spinner from '../../../components/spinner'

export default React.createClass({

    getInitialState: function() {
        return SmsStore.getState();
    },

    componentDidMount: function() {
        SmsStore.listen(this.onChange);
        HeaderActions.setTitle('验证码');
        SmsActions.init();
    },

    componentWillUnmount: function() {
        SmsStore.unlisten(this.onChange);
    },

    onChange: function(state){
        this.setState(state);
    },

    render: function(){
        const imageCode = this.state.imgCode;
        if(!imageCode) return(<Spinner />);
        const dataset = {
            imgCode: {
                type: "text",
                name: "imgCode",
                isRequired: true,
                placeholder: "请输入图片验证码",
                label: "图片验证码",
            },
            smsCode: {
                type: "text",
                name: "smsCode",
                isRequired: true,
                placeholder: "请输入手机验证码",
                label: "手机验证码",
            }
        }
        const imgSrc = `data:image/png;base64,${imageCode}`;
        return(
            <div className="auth">
                <Header ref="header" />
                <div className="logo">
                    <img src="/assets/images/logo.png" alt="logo" />
                </div>
                <form className="form relative" onSubmit={this.onSubmit}>
                    <div className="item text-nav p16 text-center">点击可获取验证码并发送到<p>{this.state.mobilePhone}</p></div>
                    <Form dataset={dataset} ref="form" />
                    <img src={imgSrc} onClick={this.refresh} />
                    <button className="btn btn-outline" onClick={this.sendSms}>获取验证码</button>
                    <div className="p16">
                        <button className="btn btn-red btn-block btn-radius" type="submit">下一步</button>
                    </div>
                </form>
            </div>
        );
    },

    onSubmit: function(e){
        e.preventDefault();
        const data = this.refs.form.getValue();
        if(data.isInvalid) return undefined;
        SmsActions.check(data.value);
    },

    refresh: function(e){
        e.preventDefault();
        SmsActions.init();
    },

    sendSms: function(e){
        e.preventDefault();
        SmsActions.sendMessage();
    }
})
