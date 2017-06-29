import React from 'react'
import LoginActions from '../actions/login'
import LoginStore from '../stores/login'
import HeaderActions from '../../common/actions/header'
import Alert from '../../../components/alert'
import {Navigation, Link} from 'react-router'
import {isLogin} from '../../common/services/authentication'
import MessageActions from '../../../components/actions/message'
import alt from '../../alt'
import styles from '../styles/login'
import LoadingComponent from './loading'
import {checkWechatAuth} from '../../wechat/services/oauth'
import validator from '../../../utils/validator';
import Form from "../../../components/form/form";
import cx from 'classnames'
import AdsActions from '../../common/actions/ads';

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.object,
    },

    getInitialState: function(){
        return LoginStore.getState();
    },

    componentWillMount: function() {
        if(isLogin()){
            this.render = function(){
                return (<div />);
            };
            console.log(this);
            this.context.router.replace('home');
        }
        if(checkWechatAuth()){
            this.render = function(){
                return (<div />);
            }
        }
    },

    componentDidMount: function(){
        const query = this.props.location.query;
        LoginActions.initial(query);
        LoginStore.listen(this.onChange);
        HeaderActions.setTitle('登录');
        AdsActions.setBanner();
    },

    componentWillUnmount: function(){
        LoginStore.unlisten(this.onChange);
        alt.recycle(LoginStore);
    },

    onChange: function(state){
        this.setState(state);
    },

    componentWillUpdate: function(nextProps, nextState){
        console.log(nextState);
        if(nextState.err) this.refs.loading.hide();
        if(nextState.jwt){
            const referer = this.props.location.query.referer || location.protocol + '//' + location.hostname + '/home';
            return location.replace(decodeURIComponent(referer));
        }
    },

    render: function(){
        const query = this.props.location.query;
        const dataset = {
            username: {
                type: "text",
                name: "username",
                isRequired: true,
                placeholder: "请输入您的手机号码/邮箱",
                label: "您的手机号码/邮箱",
                onValid: validator.validateAccount,
            },
            password: {
                type: "password",
                name: "password",
                isRequired: true,
                placeholder: "请输入您的登录密码",
                label: "登录密码",
                onValid: validator.validatePassword,
            }
        }
        return (
            <div className="login">
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <Form dataset={dataset} ref="form" />
                        <button type="submit" className="btn btn-block btn-primary submit-btn">登录</button>
                        <p className="text-center">没有账号？<Link to="register">点此注册</Link></p>
                        <p className="text-center"><Link to="/login/forgot">忘记密码?</Link></p>
                        <div className={cx("text-center oauth", cx({'hide': query.provider}))}>
                            <p className="otherLogin">其他登录</p>
                            <a href={this.generateOauthUrl('qq')} target="_blank">
                                <span className="iconfont qq">&#xe62f;</span>
                            </a>
                            <a href={this.generateOauthUrl('weibo')} target="_blank">
                                <span className="iconfont weibo">&#xe62e;</span>
                            </a>
                        </div>
                    </form>
                </div>
                <LoadingComponent ref="loading" />
            </div>
        );
    },

    generateOauthUrl: function(provider){
        const qqBaseUrl = "https://graph.qq.com/oauth2.0/authorize?which=Login&display=pc&response_type=code&client_id=101257647&scope=all";
        const weiboBaseUrl = "https://api.weibo.com/oauth2/authorize?client_id=3466403058&scope=follow_app_official_microblog&display=default&forcelogin=";
        const siteUrl = location.origin + "/oauth/callback";
        const redirectUrl = encodeURIComponent("https://www.yunchou.com/service/oauth?redirect="+siteUrl + "&provider=" + provider);
        var oathUrl = "";
        switch (provider) {
            case "qq":
                oathUrl =  qqBaseUrl + "&redirect_uri=" + redirectUrl;
                break;
            case "weibo":
                oathUrl =  weiboBaseUrl + "&redirect_uri=" + redirectUrl;
                break;
            default:
                oathUrl =  qqBaseUrl + "&redirect_uri=" + redirectUrl;
        }

        return oathUrl;
    },

    onSubmit: function(e){
        e.preventDefault();
        const data = this.refs.form.getValue();
        if(data.isInvalid) return undefined;
        this.refs.loading.show();
        LoginActions.login(data.value);
    }
})
