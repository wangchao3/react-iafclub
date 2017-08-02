import React from 'react'
import HeaderActions from '../../common/actions/header'
import UserInfoActions from '../actions/userInfo'
import UserInfoStore from '../stores/userInfo'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/userInfo'
import Header from '../../common/components/header'
import cx from 'classnames'
import {Link} from 'react-router'
import Select from '../../../components/selector'
import {EDUCATION} from '../constants/education'
import {CHILDREN} from '../constants/children'
import {MARRIAGE} from '../constants/marriage'

export default React.createClass({

    getInitialState: function() {
        return UserInfoStore.getState();
    },

    componentDidMount: function() {
        UserInfoStore.listen(this.onChange);
        HeaderActions.setTitle('个人信息');
        UserInfoActions.init();
    },

    componentWillUnmount: function() {
        UserInfoStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        const userInfo = this.state.userInfo;
        if(!userInfo) return(<Spinner />);
        let eduOptions = [], marryOptions = [], childOptions = [];
        for (var i = 0; i < EDUCATION.length; i++) {
            eduOptions.push(<option value={EDUCATION[i].key} key={i}>{EDUCATION[i].value}</option>);
        }
        for (var i = 0; i < MARRIAGE.length; i++) {
            marryOptions.push(<option value={MARRIAGE[i].key} key={i}>{MARRIAGE[i].value}</option>);
        }
        for (var i = 0; i < CHILDREN.length; i++) {
            childOptions.push(<option value={CHILDREN[i].key} key={i}>{CHILDREN[i].value}</option>);
        }
        return (
            <div className="userInfo">
                <Header ref="header"/>
                <ul>
                    <li>
                        <span className="right">{userInfo.name}</span>
                        姓名
                    </li>
                    <li>
                        <span className="right">{userInfo.bank_id_card}</span>
                        身份证号
                    </li>
                    <li className="arrow">
                        <Link className="navigate-right">
                            <span className="right">{userInfo.bank_card}</span>
                            常用银行卡
                        </Link>
                    </li>
                    <li>
                        <span className="right">{userInfo.cellphone}</span>
                        手机号
                    </li>
                    <li>
                        <Select options={eduOptions} ref="education" value={userInfo.max_edu}/>
                        最高学历
                    </li>
                    <li>
                        <Select options={marryOptions} ref="marriage" value={userInfo.marital_status}/>
                        婚姻状态
                    </li>
                    <li>
                        <Select options={childOptions} ref="children" value={userInfo.family_status}/>
                        子女情况
                    </li>
                </ul>

                <div className="saveBtn">
                    <button className="btn btn-red btn-block" onClick={this.save}>保存修改</button>
                </div>
            </div>
        );
    },

    save: function(e) {
        e.preventDefault();
        const max_edu = this.refs.education.getValue();
        const marital_status = this.refs.marriage.getValue();
        const family_status = this.refs.children.getValue();
        const payload = {
            max_edu: max_edu,
            marital_status: marital_status,
            family_status: family_status,
        }
        UserInfoActions.save(payload);
    }
})
