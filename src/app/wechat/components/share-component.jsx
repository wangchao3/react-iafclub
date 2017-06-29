import React from 'react'
import cx from 'classnames'
import styles from '../styles/share'
import WechatShareActions from "../actions/share";
import WechatShareStore from "../stores/share";
import { setWechatShare } from "../services/share";


const shareGuide = ({description, hide}) => {
    return (
        <div className="wechat-share-cmp" onTouchStart={hide}>
            <div className="wechat-share">
                <div>
                    <p>请点击右上角将它发送给指</p>
                    <p>定朋友或分享到朋友圈</p>
                </div>
                <div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default React.createClass({

    propTypes: {
        description: React.PropTypes.string,
        config: React.PropTypes.shape({
            url: React.PropTypes.string,
            img: React.PropTypes.string,
            callback: React.PropTypes.func,
            title: React.PropTypes.string.isRequired,
            desc: React.PropTypes.string,
        }).isRequired
    },

    getInitialState: function() {
        return WechatShareStore.getState();
    },

    componentDidMount() {
        WechatShareStore.listen(this.onChange);
        const {url, img, callback, cancel, title, desc} = this.props.config;
        setWechatShare(url, img, callback, cancel, title, desc);
    },

    onChange: function(state) {
        this.setState(state);
    },

    componentWillUnmount: function() {
        WechatShareStore.unlisten(this.onChange);
    },

    render: function(){
        const classnames = cx({'visible': this.state.visible});
        const description = this.props.description;
        return (
            <div className={cx("wechat-share", classnames)} onTouchStart={this.hide}>
                <div className={cx("shareOut", classnames)}>
                    <img className="shareImg" src="/assets/images/pages/otherShare.png" />
                </div>
            </div>
        );
    },

    show: function(){
        WechatShareActions.show();
    },

    hide: function(e){
        WechatShareActions.hide();
        e.preventDefault();
    },

})
