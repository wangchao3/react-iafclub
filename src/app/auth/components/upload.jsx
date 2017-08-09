import React from 'react'
import UploadStore from '../stores/upload'
import UploadActions from '../actions/upload'
import HeaderActions from '../../common/actions/header'
import alt from '../../alt'
import Header from '../../common/components/header'
import styles from '../styles/upload'
import Spinner from '../../../components/spinner'
import {findDOMNode} from "react-dom";
import {isWechat, isAPP} from '../../wechat/services/wechat';
import Modal from '../../../components/modal'
import Form from '../../../components/form/form';

export default React.createClass({

    getInitialState: function() {
        return UploadStore.getState();
    },

    componentDidMount: function() {
        UploadStore.listen(this.onChange);
        HeaderActions.setTitle('身份证上传');
    },

    componentWillUnmount: function() {
        UploadStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        return (
            <div className="upload">
                <Header ref="header"/>
                <div className="bodyContainer">
                    <form className="form" onSubmit={this.onSubmit}>
                        <Form dataset={this.state.dataset} ref="form" />
                        <div className="mt-20">
                            <button className="btn btn-red btn-block" type="submit">下一步</button>
                        </div>
                    </form>
                </div>
                <Modal className="case-modal" ref="caseModal" title="投资案例">
                    <div className="form">
                        <p>ddd</p>
                    </div>
                </Modal>
            </div>
        );
    },

    onSubmit: function(e) {
        e.preventDefault();
        const data = this.refs.form.getValue();
        if(data.isInvalid) return undefined;
        let result = data.value;
        if(isWechat()) {
            result.idImageFrontWeChatMediaId = result.front.result;
            result.idImageBackWeChatMediaId = result.back.result;
        } else {
            result.idImageFrontBase64 = result.front.result;
            result.idImageFrontName = result.front.name;
            result.idImageBackBase64 = result.back.result;
            result.idImageBackName = result.back.name;
        }
        delete result.front;
        delete result.back;
        UploadActions.submit(result);
    }
});
