import React from 'react'
import ResetActions from '../actions/reset'
import ResetStore from '../stores/reset'
import HeaderActions from '../../common/actions/header'
import Verification from '../../../components/verification'
import Alert from '../../../components/alert'
import validator from '../../../utils/validator';
import {Link} from 'react-router'
import {isLogin} from '../../common/services/authentication'
import LoadingComponent from './loading'
import styles from '../styles/reset'
import objectAssign from 'object-assign';
import Input from "../../../components/form/text";
import Form from '../../../components/form/form'

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState: function() {
        return ResetStore.getState();
    },

    componentDidMount: function() {
        ResetStore.listen(this.onChange);
        HeaderActions.setTitle('更改密码');
    },

    componentWillUnmount: function() {
        ResetStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        return (
            <div className="auth body-container">
                <div className="reset-body">
                    <form onSubmit={this.onSubmit}>
                        <Input type="password" ref="old_pwd" name="old_pwd" placeholder="请填写旧密码" onValid={validator.validatePassword} label="旧密码" isRequired={true}/>
                        <Input type="password" ref="new_pwd" name="new_pwd" placeholder="请填写新密码" onValid={validator.validatePassword} label="新密码" isRequired={true}/>
                        <Input type="password" ref="new_pwd_re" name="new_pwd_re" placeholder="请再次填写新密码" onValid={validator.validatePassword} label="新密码" isRequired={true}/>
                        <button className="btn btn-block btn-red" type="submit">确认</button>
                    </form>
                </div>
                <LoadingComponent ref="loading"/>
            </div>
        );
    },

    onSubmit: function(e) {
        e.preventDefault();
        var value = {
            old_pwd: this.refs.old_pwd.getValue(),
            new_pwd: this.refs.new_pwd.getValue(),
            new_pwd_re: this.refs.new_pwd_re.getValue()
        };
        let isValid = true;
        for (var i in value) {
            if (!value[i])
                isValid = false;
            };
        if (!isValid)
            return undefined;
        let data = JSON.parse(JSON.stringify(value))
        console.log(data);
        this.refs.loading.show();
        ResetActions.update(data);
    }
})
