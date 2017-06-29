import React from 'react'
import {Link} from 'react-router'
import styles from '../styles/error'
import cx from 'classnames'

export default React.createClass({
    propTypes: {
        hiderefresh: React.PropTypes.bool
    },

    refresh: function(){
        location.reload();
    },

    render: function(){
        return (
            <div className="error-page server-error">
                <img src="/assets/images/pages/500.png" />
                <h2>服务器繁忙</h2>
                <div className="text">
                    <p>可能的原因：</p>
                    <p>网络信号弱</p>
                    <p>网站正在更新</p>
                    <p>管理员被外星人抓走了</p>
                </div>
                <button className={ cx("btn btn-primary btn-outlined btn-lg btn-refresh", cx({'hide': this.props.hiderefresh}) )} onClick={this.refresh}>刷新</button>
            </div>
        );
    }
})
