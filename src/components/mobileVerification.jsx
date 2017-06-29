import React from 'react'
import Verification from './verification'
import {findDOMNode} from "react-dom";

export default React.createClass({

    propTypes: {
        placeholder: React.PropTypes.string,
        mobile: React.PropTypes.string,
        codeType: React.PropTypes.string,
    },

    mobile: null,

    componentWillMount: function() {
        this.mobile = this.props.mobile || null;
    },

    showVerification: function(){
        const mobile = findDOMNode(this.refs.mobile).value.trim();
        if(!mobile) return alert('请填写手机号码');
        if(!/^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(mobile)) return alert('手机号码格式错误');
        this.mobile = mobile;
        this.forceUpdate();
        this.refs.verification.show();
    },

    //export method return mobile and code {mobilePhone, verificationCode}
    getValue: function(){
        const mobile = findDOMNode(this.refs.mobile).value.trim();
        if(!mobile) return alert('请填写手机号码');
        if(!/^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(mobile)) return alert('手机号码格式错误');
        const code = findDOMNode(this.refs.code).value.trim();
        if(!code) return alert('请填写验证码');
        if(!/^\d{4}$/.test(code)) return alert('验证码错误');
        return {
            mobilePhone: mobile,
            verificationCode: code,
        };
    },

    render: function(){
        const placeholder = this.props.placeholder || '请填写手机号码';
        const codeType = this.props.codeType || '手机注册';
        return (
            <div>
                <div className="form-group">
                    <input type="text" className="form-control" defaultValue={this.mobile} ref="mobile" placeholder={placeholder} />
                </div>
                <div className="input-group form-group">
                    <input type="text" className="form-control" placeholder="请填写手机验证码" ref="code" />
                    <span className="btn btn-positive" onClick={this.showVerification}>获取验证码</span>
                </div>
                <Verification mobile={this.mobile} ref="verification" codeType={codeType} />
            </div>
        );
    }
})
