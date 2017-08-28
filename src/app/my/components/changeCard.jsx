import React from 'react'
import HeaderActions from '../../common/actions/header'
import ChangeCardActions from '../actions/changeCard'
import ChangeCardStore from '../stores/changeCard'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/userInfo'
import cx from 'classnames'
import {Link} from 'react-router'
import Select from '../../../components/selector'

export default React.createClass({

    getInitialState: function() {
        return ChangeCardStore.getState();
    },

    componentDidMount: function() {
        ChangeCardStore.listen(this.onChange);
        HeaderActions.setTitle('更换银行卡');
        ChangeCardActions.init();
        ChangeCardActions.initBank();
    },

    componentWillUnmount: function() {
        ChangeCardStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        const userInfo = this.state.userInfo;
        if(!userInfo) return(<Spinner />);
        const banks = this.state.banks;
        if(!banks) return (<Spinner />)
        let options = [];
        for (var i = 0; i < banks.length; i++) {
            options.push(<option value={banks[i].name} key={i}>{banks[i].name}</option>);
        }
        return (
            <div className="userInfo body-container">
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
                </ul>

                <div className="saveBtn">
                    <button className="btn btn-red btn-block" onClick={this.save}>确认修改</button>
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
        ChangeCardActions.save(payload);
    }
})
