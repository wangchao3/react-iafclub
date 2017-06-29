import React from 'react';
import cx from "classnames";
import {findDOMNode} from "react-dom";
import styles from '../styles/form/file';

export default React.createClass({

    getInitialState: function() {
        return {
            errMsg: null,
            fileName: null,
        };
    },

    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(['doc', 'image']),
        maxSize: React.PropTypes.number,
        label: React.PropTypes.string,
        value: React.PropTypes.string,
        regex: React.PropTypes.instanceOf(RegExp),
        isRequired: React.PropTypes.bool,
        classNames: React.PropTypes.string,
        placeHolder: React.PropTypes.string,
        tip: React.PropTypes.string,
        fileName: React.PropTypes.string,
    },

    componentWillMount: function() {
        if(this.props.fileName) this.setState({fileName: this.props.fileName});
    },

    render: function() {
        const errMsg = this.state.errMsg;
        const maxSize = this.props.maxSize ? this.props.maxSize : 20;
        let tip = "仅支持PDF,Word,Excel,Powerpoint格式,不超过" + maxSize + "M";
        if(this.props.tip) tip = this.props.tip;
        if(this.props.type === "image") tip = "仅支持jpg,png,gif,jpeg格式,不超过" + maxSize + "M";
        if(this.state.fileName) tip = this.state.fileName
        return (
            <div className={cx('form-group', cx({'has-error': errMsg}))}>
                <div className="file-input">
                    <label htmlFor={"fileInput" + this.props.name}>{this.props.label}</label>
                    <input type="file" id={"fileInput" + this.props.name} onChange={this.onChange} ref="input" />
                    <div className="file-input-placeholder">
                        <span className="icon icon-plus"></span>
                    </div>
                </div>
                <div className="file-tip">{tip}</div>
                <div className={cx('error-message', cx({'hide': !errMsg}))}>{errMsg}</div>
            </div>
        )
    },

    onChange: function(e) {
        this.setState({errMsg: null});
        const file = e.target.files[0];
        if(!file) return false;
        const fileName = file.name;
        let type = "doc";
        if(this.props.type) type = this.props.type;
        if(type === "doc" && ! /\.(doc|docx|ppt|pdf|xls|xlsx|pptx)$/i.test(fileName)) {
            return this.setState({errMsg: "文件格式错误!"});
        }
        if(type === "image" && ! /\.(jpg|png|gif|jpeg)$/i.test(fileName)) {
            return this.setState({errMsg: "文件格式错误!"});
        }
        if(this.props.regex && !this.props.regex.test(fileName)) {
            return this.setState({errMsg: "文件格式错误!"});
        }
        this.setState({fileName: fileName});
    },

    getValue: function() {
        return new Promise((reslove, reject) => {
            if(this.state.errMsg) return reject(this.state.errMsg);
            const file = this.refs.input.files[0];
            if(!file) {
                if(this.props.isRequired){
                    this.setState({errMsg: "请选择文件"});
                    return reject("请选择文件");
                }
                return reslove("")
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                reslove({result: reader.result, name: file.name});
            }
        });
    }
})
