import React from 'react'
import LoginStore from '../stores/login'
import LoginActions from '../actions/login'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import alt from '../../alt'
import styles from '../styles/login'
import Form from "../../../components/form/form"
import {getParameterByName} from '../../../utils/utils'

export default React.createClass({

    getInitialState: function() {
        return LoginStore.getState();
    },

    componentDidMount: function() {
        LoginStore.listen(this.onChange);
        const type = getParameterByName('type') ? getParameterByName('type') : 10;
        HeaderActions.show();
        if(type == 10) {
            HeaderActions.setTitle('个人消费贷');
        }else {
            HeaderActions.setTitle('企业经营贷');
        }
    },

    componentWillUnmount: function() {
        LoginStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        const dataset = {
            phone: {
                type: "text",
                name: "phone",
                isRequired: true,
                placeholder: "请输入手机号",
                label: "账号"
            },
            password: {
                type: "password",
                name: "password",
                isRequired: true,
                placeholder: "请输入密码",
                label: "密码"
            }
        }
        const type = getParameterByName('type') ? getParameterByName('type') : 10;
        return (
            <div className="auth body-container">
                <div className="login-body text-center">
                    <img src="/assets/images/index/login.png" alt="logo" className="logo"/>
                    <form className="form" onSubmit={this.onSubmit}>
                        <Form dataset={dataset} ref="form"/>
                        <div className="p16">
                            <button className="btn btn-red btn-block" type="submit">登录</button>
                        </div>
                    </form>
                    <ul className="foot-list">
                        <li className="size12">
                            <Link className="color-gray" to={`/user/forgot?type=${type}`}>忘记密码</Link>
                        </li>
                        <li className="size12">
                            <Link className="color-gray" to={`/user/register`}>注册账号</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    },

    onSubmit: function(e) {
        e.preventDefault();
        const data = this.refs.form.getValue();
        if (data.isInvalid)
            return undefined;
        LoginActions.login(data.value);
    }
})
