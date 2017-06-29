import React from 'react';
import {isWechat} from '../../app/wechat/services/wechat';
import cx from 'classnames';
import styles from '../styles/form/image-input';
import {getWechatConf} from "../../app/wechat/services/wechat"

export default React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        defaultValue: React.PropTypes.string,
        max: React.PropTypes.number,
        label: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        defaultName: React.PropTypes.string,
    },

    componentWillMount: function() {
        getWechatConf(false, ["chooseImage", "uploadImage"]).then(function(res){
            console.log(res)
        }, function(err){
            console.log(err)
        })
    },


    getInitialState: function() {
        return {
            name: this.props.defaultName,
            result: this.props.defaultValue,
            errMsg: null,
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.defaultName){
            this.setState({'name': nextProps.defaultName});
        };
        if(nextProps.defaultValue){
            this.setState({'result': nextProps.defaultValue});
        };
    },

    render: function() {
        const errMsg = this.state.errMsg;
        return (
            <div className={cx('form-group', cx({'has-error': errMsg}))}>
                <div className="image-input" onClick={this.weChatPicturePicker}>
                    <label htmlFor={"imageInput" + this.props.name}>{this.props.label}</label>
                    <input type="file" accept="image/*" ref="input" id={"imageInput" + this.props.name} onClick={this.onClick} onChange={this.readImage} />
                    <img className={"imageInput" + this.props.name} src={this.state.result} />
                </div>
                <div className={cx('error-message', cx({'hide': !errMsg}))}>{errMsg}</div>
            </div>
        )
    },

    onClick: function(event){
        if(isWechat()) return event.preventDefault();
    },

    readImage: function(event) {
        this.resetError();
        if(isWechat()) return event.preventDefault();
        const file = event.target.files[0];
        if(this.props.max && file.size / 1024 / 1024 > this.props.max) return this.setState({errMsg: "图片大小不得大于" + this.props.max + 'M'});
        if(!/\.(jpg|png|gif|jpeg)$/i.test(file.name)) return this.setState({errMsg: "图片格式错误"});
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({result: reader.result});
            this.setState({name: file.name});
        }
    },

    weChatPicturePicker: function(e) {
        if(!isWechat()) return undefined;
        const config = {
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                this.setState({result: res.localIds[0]});
                this.uploadToweChat();
            }
        };
        wx.chooseImage(config);
    },

    error: null,

    serverId: null,

    uploadToweChat: function() {
        this.error = "正在上传照片中";
        const config = {
            localId: this.state.result,
            success: (res) => {
                this.serverId = res.serverId;
                this.error = null;
            },
            fail: () => {
                this.error = '图片上传失败, 请重试'
            }
        }
        wx.uploadImage(config);
    },

    resetError: function() {
        this.setState({errMsg: null});
    },

    getValue: function() {
        if(isWechat()){
            if(this.error) {
                alert(this.error);
                return null;
            }
            if(this.error && this.props.isRequired) return this.setState({errMsg: '请上传' + this.props.label});
            return {result: this.serverId, platForm: 'wechat'}
        }
        React.findDOMNode(this.refs.input).value = "";
        if((!this.state.result || this.state.result === this.props.defaultValue) && this.props.isRequired) return this.setState({errMsg: '请上传' + this.props.label});
        if(this.state.result === this.props.defaultValue) return {};
        return {result: this.state.result, name: this.state.name};
    }
})
