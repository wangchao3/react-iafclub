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
import Input from "../../../components/form/text";
import validator from '../../../utils/validator';
import {getRefererr} from '../../common/services/app';
import objectAssign from 'object-assign';

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
                ref: "imgCode"
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
                    <div className="input-group">
                        <Input
                            ref="imgCode"
                            name="imgCode"
                            placeholder="请填写图片验证码"
                            onValid={validator.validateSmsCode}
                            label="图片验证码"
                            isRequired={true}
                        />
                        <img src={imgSrc} onClick={this.refresh} />
                    </div>
                    <div className="input-group">
                        <Input
                            ref="verificationCode"
                            name="verificationCode"
                            placeholder="请填写短信验证码"
                            onValid={validator.validateSmsCode}
                            label="短信验证码"
                            isRequired={true}
                        />
                        <span className="btn btn-positive" onClick={this.sendSms}>获取验证码</span>
                    </div>
                    <div className="p16">
                        <button className="btn btn-red btn-block btn-radius" type="submit">下一步</button>
                    </div>
                </form>
            </div>
        );
    },

    onSubmit: function(e){
        e.preventDefault();
        var value = {
            imgCode: this.refs.imgCode.getValue(),
            verificationCode: this.refs.verificationCode.getValue(),
        };
        let isValid = true;
        for(var i in value){
            if(!value[i]) isValid = false;
        };
        if(!isValid) return undefined;
        const refererr = getRefererr();
        console.log(refererr);
        let data = JSON.parse(JSON.stringify(value))
        if(refererr){
            data = objectAssign(data, refererr);
        }
        SmsActions.login(data);
    },

    refresh: function(e){
        e.preventDefault();
        SmsActions.init();
    },

    sendSms: function(e){
        e.preventDefault();
        if(!this.refs.imgCode.getValue()) return undefined;
        SmsActions.sendMessage(this.refs.imgCode.getValue());
    }
})
