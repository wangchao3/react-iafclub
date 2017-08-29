import React from 'react'
import HeaderActions from '../../common/actions/header'
import UserInfoActions from '../actions/userInfo'
import UserInfoStore from '../stores/userInfo'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/userInfo'
import cx from 'classnames'
import {Link} from 'react-router'
import Select from '../../../components/selector'
import {EDUCATION} from '../constants/education'
import {CHILDREN} from '../constants/children'
import {MARRIAGE} from '../constants/marriage'
import {INCOME} from '../constants/income'
import ReactDOM from 'react-dom'
import DatePicker from 'react-mobile-datepicker'
import {formatDateTime3} from '../../../utils/utils'
import {findDOMNode} from "react-dom"
import Alert from '../../../components/alert'

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.object,
    },

    getInitialState: function() {
        return UserInfoStore.getState();
    },

    componentDidMount: function() {
        UserInfoStore.listen(this.onChange);
        HeaderActions.setTitle('个人信息');
        UserInfoActions.init();
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if(!this.state.success && nextState.success){
            this.refs.successAlert.show("恭喜您,保存成功");
            return false;
        }
        return true;
    },

    componentWillUnmount: function() {
        UserInfoStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    handleClick: function(value) {
        let choose = value;
        this.setState({choose: choose,isOpen: true});
    },

    handleCancel: function() {
        this.setState({isOpen: false});
    },

    handleSelect: function(value) {
        console.log(this.state.choose);
        if (this.state.choose == 1) {
            let job_time = value;
            this.setState({job_time, isOpen: false});
        }else {
            let job_time_recent = value;
            this.setState({job_time_recent, isOpen: false});
        }
    },

    render: function() {
        const userInfo = this.state.userInfo;
        if(!userInfo) return(<Spinner />);
        let showTime = formatDateTime3(this.state.job_time/1);
        let showTime2 = formatDateTime3(this.state.job_time_recent/1);
        let eduOptions = [], marryOptions = [], childOptions = [], incomeOptions = [];
        for (var i = 0; i < EDUCATION.length; i++) {
            eduOptions.push(<option value={EDUCATION[i].key} key={i}>{EDUCATION[i].value}</option>);
        }
        for (var i = 0; i < MARRIAGE.length; i++) {
            marryOptions.push(<option value={MARRIAGE[i].key} key={i}>{MARRIAGE[i].value}</option>);
        }
        for (var i = 0; i < CHILDREN.length; i++) {
            childOptions.push(<option value={CHILDREN[i].key} key={i}>{CHILDREN[i].value}</option>);
        }
        for (var i = 0; i < INCOME.length; i++) {
            incomeOptions.push(<option value={INCOME[i].key} key={i}>{INCOME[i].value}</option>);
        }
        return (
            <div className="userInfo body-container">
                <ul>
                    <li><span className="right">{userInfo.name}</span>姓名</li>
                    <li><span className="right">{userInfo.bank_id_card}</span>身份证号</li>
                    <li className="arrow">
                        <Link className="navigate-right" to={`/my/changeCard`}>
                            <span className="right">{userInfo.bank_card}</span>
                            常用银行卡
                        </Link>
                    </li>
                    <li><span className="right">{userInfo.cellphone}</span>手机号</li>
                    <li><Select options={eduOptions} ref="education" value={userInfo.max_edu}/>最高学历</li>
                    <li><Select options={marryOptions} ref="marriage" value={userInfo.marital_status}/>婚姻状态</li>
                    <li><Select options={childOptions} ref="children" value={userInfo.family_status}/>子女情况</li>
                </ul>
                <ul>
                    <li className="amountLi">
                        <label>工作岗位</label>
                        <input type="text" ref="job" className="job" defaultValue={userInfo.job} onChange={this.changeValue} />
                    </li>
                    <li className="arrow">
                        <Link className="navigate-right" onClick={() => this.handleClick(1)}>
                            <span className="right">{showTime}</span>
                            就业年月
                        </Link>
                    </li>
                    <li className="arrow">
                        <Link className="navigate-right" onClick={() => this.handleClick(2)}>
                            <span className="right">{showTime2}</span>
                            现公司入职年月
                        </Link>
                    </li>
                    <li><Select options={incomeOptions} ref="income" value={userInfo.month_income}/>月收入</li>

    				<DatePicker
    					value = {this.state.time}
    					isOpen = {this.state.isOpen}
    					onSelect = {this.handleSelect}
    					onCancel = {this.handleCancel}
                        dateFormat = {['YYYY', 'MM']} />
                </ul>

                <div className="saveBtn">
                    <button className="btn btn-red btn-block" onClick={this.save}>保存修改</button>
                </div>
                <Alert
                    ref="successAlert"
                    callback={this.goBack}
                />
            </div>
        );
    },

    goBack: function(){
        this.context.router.replace(`/my/home`);
    },

    save: function(e) {
        e.preventDefault();
        const max_edu = this.refs.education.getValue();
        const marital_status = this.refs.marriage.getValue();
        const family_status = this.refs.children.getValue();
        const month_income = this.refs.income.getValue();
        const job = findDOMNode(this.refs.job).value.trim();
        let job_time, job_time_recent;
        if(typeof this.state.job_time === "string"){
            job_time = this.state.job_time;
        }else {
            job_time = this.state.job_time.getTime();
        }
        if(typeof this.state.job_time_recent === "string"){
            job_time_recent = this.state.job_time_recent;
        }else {
            job_time_recent = this.state.job_time_recent.getTime();
        }
        const payload = {
            max_edu: max_edu,
            marital_status: marital_status,
            family_status: family_status,
            job: job,
            job_time: job_time,
            job_time_recent: job_time_recent,
            month_income: month_income,
        }
        UserInfoActions.save(payload);
    }
})
