import React from 'react'
import VerificationActions from './actions/verification'
import VerificationStore from './stores/verification'
import url from './constants/url'
import Modal from './modal'
import styles from './styles/verification'
import MessageActions from './actions/message'
import {findDOMNode} from "react-dom";

const ErrorNode = ({err}) => {
    if(err) {
        return (<div className="error-block">{err}</div>)
    } else {
        return (<div />)
    }
};

export default React.createClass({

    propTypes: {
        mobile: React.PropTypes.string,
        type: React.PropTypes.string,
        codeType: React.PropTypes.string,
    },

    getInitialState: function(){
        return VerificationStore.getState();
    },

    componentDidMount: function(){
        VerificationStore.listen(this.onChange);
    },

    componentWillUnmount: function(){
        VerificationStore.unlisten(this.onChange);
    },

    componentWillUpdate: function(nextProps, nextState) {
        if(!this.state.sendSuccess && nextState.sendSuccess){
           this.hide();
            MessageActions.show({'message': '发送成功'});
        }
    },

    onChange: function(state){
        this.setState(state);
    },

    refresh: function(){
        findDOMNode(this.refs.captchaImage).src = url.captcha;
    },

    render: function(){
        return (
            <Modal className="verification-modal" ref="verificationModal" title="温馨提示">
                <div className="form">
                    <p>请填写右侧图片验证码，以便向您的手机发送验证码</p>
                    <div onSubmit={this.onSubmit}>
                        <img src={url.captcha} className="captcha-image" ref="captchaImage" onClick={this.refresh} />
                        <div className="captcha-input">
                            <div calssName="form-group">
                                <input type="text" className="form-control" ref="captcha" />
                            </div>
                            <ErrorNode err={this.state.err} />
                        </div>
                    </div>
                    <button onClick={(e)=>this.onSubmit(e, "text")} className="btn btn-half mr-10 btn-info">短信发送</button>
                    <button onClick={(e)=>this.onSubmit(e, "sound")} className="btn btn-half btn-primary">语音发送</button>
                </div>
            </Modal>
        );
    },

    onSubmit: function(e, sendType){
        e.preventDefault();
        if(!this.props.mobile) return undefined;
        this.props.codeType ? this.props.codeType : '手机注册';
        const captcha = findDOMNode(this.refs.captcha).value.trim().replace(/\s/g, "");
        let type;
        if (sendType == 'text') {
            type = '短信'
        }else if (sendType == 'sound') {
            type = '语音'
        }
        const data = {
            to: this.props.mobile,
            type: type,
            captcha: captcha,
            codeType: this.props.codeType,
        };
        VerificationActions.send(data);
    },

    setType: function(type) {
        VerificationActions.setType(type);
    },

    hide: function(){
        this.refs.verificationModal.hide();
    },

    show: function(){
        if(!this.props.mobile) return undefined;
        this.refs.verificationModal.show();
        this.refresh();
        findDOMNode(this.refs.captcha).focus();
    }

})
