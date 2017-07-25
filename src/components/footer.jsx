import React from 'react'
import styles from './styles/footer'
import {Link} from 'react-router'
import {isLogin} from "../app/common/services/authentication";

export default React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    render: function() {
        const comeFrom = this.props.name;
        let data = {};
        switch (comeFrom) {
            case "borrow":
                data.borrow = "borrow";
                break;
            case "repay":
                data.repay = "repay";
                break;
            case "home":
                data.home = "home";
                break;
            default:
                data.borrow = "borrow";
        }

        return (
            <dl className="container footer_container">
                <dt>
                    <Link to="/" className={data.borrow
                        ? 'active'
                        : ''}>
                        <span className="iconfont">&#xe607;</span>
                        <span>借钱</span>
                    </Link>
                </dt>
                <dt>
                    <Link to="/product/list" className={data.repay
                        ? 'active'
                        : ''}>
                        <span className="iconfont">&#xe629;</span>
                        <span>还钱</span>
                    </Link>
                </dt>
                <dt>
                    <Link to="/my/home" className={data.home
                        ? 'active'
                        : ''}>
                        <span className="iconfont">&#xe67d;</span>
                        <span>我的</span>
                    </Link>
                </dt>
            </dl>
        );
    }
})
