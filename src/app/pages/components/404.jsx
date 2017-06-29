import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
    render: function(){
        return (
            <div className="error-page not-found">
                <img src="/assets/images/pages/404.png" />
                <h2>你所请求的页面不存在</h2>
                <div className="text">
                    <p>可能的原因：</p>
                    <p>找不到请求的页面</p>
                    <p>输入的网址不正确</p>
                    <p>您要查看的页面已过期</p>
                </div>
                <Link className="btn btn-primary btn-outlined btn-lg" to="/">返回首页</Link>
            </div>
        );
    }
})