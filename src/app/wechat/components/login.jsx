import React from 'react'
import LoginActions from '../actions/login'
import LoginStore from '../stores/login'
import HeaderActions from '../../common/actions/header'
import Alert from '../../../components/alert'
import {Navigation, Link} from 'react-router'
import MessageActions from '../../../components/actions/message'
import alt from '../../alt'
import styles from '../../users/styles/login'
import LoadingComponent from '../../users/components/loading'
import validator from '../../../utils/validator';
import Form from "../../../components/form/form";
import cx from 'classnames'

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.object,
    },

    getInitialState: function(){
        return LoginStore.getState();
    },

    componentDidMount: function(){
        const query = this.props.location.query;
        LoginActions.initial(query);
        LoginStore.listen(this.onChange);
        HeaderActions.setTitle('微信绑定');
    },

    componentWillUnmount: function(){
        LoginStore.unlisten(this.onChange);
        alt.recycle(LoginStore);
    },

    onChange: function(state){
        this.setState(state);
    },

    componentWillUpdate: function(nextProps, nextState){
        if(nextState.err) this.refs.loading.hide();
        if(nextState.jwt){
            const referer = this.props.location.query.referer || location.protocol + '//' + location.hostname + '/home';
            return location.replace(decodeURIComponent(referer));
        }
    },

    render: function(){
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
                        <button type="submit" className="btn btn-block btn-primary submit-btn">绑定</button>
                    </form>
                </div>
                <LoadingComponent ref="loading" />
            </div>
        );
    },

    onSubmit: function(e){
        e.preventDefault();
        const data = this.refs.form.getValue();
        if(data.isInvalid) return undefined;
        this.refs.loading.show();
        LoginActions.login(data.value);
    }
})
