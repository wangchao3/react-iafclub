import React from 'react'
import InfoStore from '../stores/info'
import InfoActions from '../actions/info'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import alt from '../../alt'
import styles from '../styles/info'
import Input from "../../../components/form/text";
import validator from '../../../utils/validator';

export default React.createClass({

    getInitialState: function() {
        return InfoStore.getState();
    },

    componentDidMount: function() {
        InfoStore.listen(this.onChange);
        HeaderActions.show();
        HeaderActions.setTitle('企业信息');
    },

    componentWillUnmount: function() {
        InfoStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        return (
            <div className="companyInfo body-container">
                <form onSubmit={this.onSubmit}>
                    <ul>
                        <Input type="liInput" ref="name" name="name" placeholder="请输入" label="企业名称" isRequired={true} onValid={function(s) {
                            return validator.validateChineseChar(s, '企业名称')
                        }} />
                        <Input type="liInput" ref="sccn" name="sccn" placeholder="请输入" label="社会信用代码证号" isRequired={true} />
                        <Input type="liInput" ref="ocn" name="ocn" placeholder="请输入" label="组织机构代码证号" isRequired={true} />
                        <Input type="liInput" ref="law_name" name="law_name" placeholder="请输入" label="法定代表人" isRequired={true} onValid={function(s) {
                            return validator.validateChineseName(s, '法定代表人')
                        }} />
                        <Input type="liInput" ref="law_card" name="law_card" placeholder="请输入" label="法定代表人身份证" isRequired={true} onValid={function(s) {
                            return validator.validateIdNo(s, '法定代表人身份证')
                        }} />
                        <Input type="liInput" ref="call_name" name="call_name" placeholder="请输入" label="联系人姓名" isRequired={true} onValid={function(s) {
                            return validator.validateChineseName(s, '联系人姓名')
                        }} />
                        <Input type="liInput" ref="call_card" name="call_card" placeholder="请输入" label="联系人身份证" isRequired={true} onValid={function(s) {
                            return validator.validateIdNo(s, '联系人身份证')
                        }} />
                    </ul>
                    <div className="saveBtn">
                        <button className="btn btn-red btn-block" type="submit">下一步</button>
                    </div>
                </form>
            </div>
        );
    },

    onSubmit: function(e) {
        e.preventDefault();
        var value = {
            name: this.refs.name.getValue(),
            sccn: this.refs.sccn.getValue(),
            ocn: this.refs.ocn.getValue(),
            law_name: this.refs.law_name.getValue(),
            law_card: this.refs.law_card.getValue(),
            call_name: this.refs.call_name.getValue(),
            call_card: this.refs.call_card.getValue()
        };
        let isValid = true;
        for (var i in value) {
            if (!value[i]) isValid = false;
        };
        if (!isValid) return undefined;
        let data = JSON.parse(JSON.stringify(value));
        InfoActions.submit(data);
    }
})
