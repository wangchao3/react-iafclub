import {Navigation, State} from 'react-router'
import {isLogin} from '../app/common/services/authentication'
import React from 'react'
import {checkWechatAuth} from '../app/wechat/services/oauth'
import {isWechat} from '../app/wechat/services/wechat'

const LoginRequired = {

    componentWillMount: function() {
        if(!isLogin()){
            this.render = function(){
                return (<div />);
            }
            if(isWechat()) return checkWechatAuth();
            let referer = location.href;
            const path = location.pathname;
            if(path === '/user/login' || path === 'user/register') referr = location.protocol + '//' + location.hostname + '/my/home';
            this.replaceWith('user/login', null, {referer: encodeURIComponent(referer)});
        }
    },
}

export default LoginRequired
