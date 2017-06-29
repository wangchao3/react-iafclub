import React from 'react'
import {getWechatOauthUri} from '../services/oauth'
import styles from '../styles/retry'

export default (props) => {
    return (
        <div className="container text-center wechat-retry-page">
            <div className="failed-face">
                <i className="iconfont">&#xe61d;</i>
            </div>
            <div>
                授权登录失败
            </div>
            <a href={getWechatOauthUri()} className="btn btn-primary btn-block">重新授权</a>
        </div>
    );
}
