import React from 'react'
import ResetPasswordActions from '../actions/resetPassword'
import ResetPasswordStore from '../stores/resetPassword'
import MobileVerification from '../../../components/mobileVerification'
import HeaderActions from '../../common/actions/header'
import {getUser} from '../../common/services/authentication'
import {findDOMNode} from "react-dom";

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.object,
    },

    getInitialState: function() {
        return ResetPasswordStore.getState();
    },

    componentDidMount: function() {
        ResetPasswordStore.listen(this.onChange);
        HeaderActions.setTitle('重设密码');
    },

    componentWillUnmount() {
        ResetPasswordStore.unlisten(this.onChange);
    },

    onChange: function(state){
        this.setState(state);
    },

    onSubmit: function(e){
        e.preventDefault();
        let payload = this.refs.mobileVerfication.getValue();
        if(!payload) return false;
        const password = findDOMNode(this.refs.password).value.trim();
        if(!password.length) return alert('请填写密码');
        if(password.length < 6) return alert('密码长度不得小于6位');
        payload.password = password;
        ResetPasswordActions.submit(payload);
    },

    componentWillUpdate: function(nextProps, nextState) {
        if(!this.state.success && nextState.success) return this.context.router.replace('/home');
    },

    render: function(){
        let mobile = null;
        const user = getUser();
        if(user && user.mobilePhone) mobile = user.mobilePhone;
        return (
            <div className="reset-password-page container">
                <form onSubmit={this.onSubmit}>
                    <MobileVerification ref="mobileVerfication" mobile={mobile} placeholder="请填写您在云筹绑定的手机号码" codeType="手机找回密码" />
                    <div className="form-group">
                        <input type="password" className="form-control" ref="password" placeholder="请填写新密码" />
                    </div>
                    <button className="btn btn-block btn-primary submit-btn" type="submit">重设密码</button>
                </form>
            </div>
        );
    }
})
