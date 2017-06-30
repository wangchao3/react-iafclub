import React from 'react'
import styles from './styles/footer'
import {Link} from 'react-router'

export default React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
    },

    render: function(){
        const comeFrom = this.props.name;
        let data = {};
        switch(comeFrom){
            case "frontpage":
                data.frontpage = "frontpage";
                break;
            case "list":
                data.list = "list";
                break;
            case "insurance":
                data.insurance = "insurance";
                break;
            case "home":
                data.home = "home";
                break;
            default:
                data.frontpage = "frontpage";
            }
        return (
            <dl className="container footer_container">
                <dt><Link to="/" className={data.frontpage ? 'active' : ''}><span className="iconfont">&#xe607;</span><span>首页</span></Link></dt>
                <dt><Link to="/product/list" className={data.list ? 'active' : ''}><span className="iconfont">&#xe629;</span><span>投资</span></Link></dt>
                <dt><Link to="/product/insurance" className={data.insurance ? 'active' : ''}><span className="iconfont">&#xe692;</span><span>保险</span></Link></dt>
                <dt><Link to="/my/home" className={data.home ? 'active' : ''}><span className="iconfont">&#xe67d;</span><span>账户</span></Link></dt>
            </dl>
        );
    }
})
