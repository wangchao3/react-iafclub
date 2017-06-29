import React from 'react';
import MobileVerification from '../../../components/mobileVerification';
import {getRefererr} from '../../common/services/app';
import objectAssign from 'object-assign';
import styles from '../styles/oauth';

export default React.createClass({

    propTypes: {
        register: React.PropTypes.func.isRequired
    },

    mobile: null,

    onSubmit: function(e){
        e.preventDefault();
        let payload = this.refs.verification.getValue();
        const refererr = getRefererr();
        if(refererr) {
            payload = objectAssign(payload, refererr);
        }
        if(!payload) return false;
        this.props.register(payload);
    },

    render: function(){
        return (
            <div className="container wechat-auth">
                <div className="welcome">
                    <img src="/assets/images/pages/logo.png" className="welcome-logo" />
                    <div className="welcome-text">
                        欢迎您成为云筹用户，与专业投资机构一起投资快速成长的项目，实现财富快速增长。
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <MobileVerification ref="verification" />
                    <button className="btn btn-block btn-primary submit-btn">绑定微信</button>
                </form>
            </div>
        );
    }
});
