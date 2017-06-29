import React from 'react'
import cx from 'classnames'
import styles from '../styles/share'
import WechatShareActions from "../actions/share";
import WechatShareStore from "../stores/share";


export default React.createClass({

    propTypes: {
        type: React.PropTypes.string,
        description: React.PropTypes.string,
    },

    getInitialState: function() {
        return WechatShareStore.getState();
    },

    componentWillMount: function() {
        WechatShareStore.listen(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    componentWillUnmount: function() {
        WechatShareStore.unlisten(this.onChange);
    },

    render: function(){
        const shareText = (() => {
            const type = this.props.type;
            const description = this.props.description;
            if(type === 'product'){
                return (
                    <div className={cx("product-wechat-share-cmp", classnames)} onTouchStart={this.hide}>
                        <div className="product-wechat-share">
                            <div>
                                <p>请点击右上角将它发送给指</p>
                                <p>定朋友或分享到朋友圈</p>
                            </div>
                            <div>
                                <p>{description ? description : '分享带来一位用户购买可,延长一年收益,上不封顶'}</p>
                            </div>
                        </div>
                    </div>
                )
            }else if (type === 'project') {
                return (
                    <div className={cx("shareOut", classnames)} onTouchStart={this.hide}>
                        <img className="shareImg" src="/assets/images/pages/share.png" />
                    </div>
                )
            }else if (type === 'movie') {
                return (
                    <div className={cx("shareOut", classnames)} onTouchStart={this.hide}>
                        <img className="shareImg" src="/assets/images/pages/zfbShare.png" />
                    </div>
                )
            }else {
                return (
                    <div className={cx("shareOut", classnames)} onTouchStart={this.hide}>
                        <img className="shareImg" src="/assets/images/pages/otherShare.png" />
                    </div>
                )
            }
        })()
        const classnames = cx({'visible': this.state.visible});
        return (
            <div className={cx("wechat-share", classnames)}>
                {shareText}
            </div>
        );
    },

    show: function(){
        WechatShareActions.show();
    },

    hide: function(){
        WechatShareActions.hide();
    },

})
