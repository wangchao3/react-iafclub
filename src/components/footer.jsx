import React from 'react'
import styles from './styles/footer'
import {Link} from 'react-router'
import {isLogin} from "../app/common/services/authentication";

export default React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired
    },

    render: function() {
        const comeFrom = this.props.name;
        const type = this.props.type;
        let data = {}, companyData = {};
        switch (comeFrom) {
            case "borrow":
                data.borrow = "borrow";
                companyData.borrow = "borrow";
                break;
            case "repay":
                data.repay = "repay";
                break;
            case "home":
                data.home = "home";
                companyData.home = "home";
                break;
            default:
                data.borrow = "borrow";
                companyData.borrow = "borrow";
        }
        if (type === 'company') {
            return (
                <dl className="container footer_container">
                    <dt>
                        <Link to="/company/index" className={companyData.borrow
                            ? 'active'
                            : ''}>
                            <span className="iconfont">&#xe656;</span>
                            <span>借钱</span>
                        </Link>
                    </dt>
                    <dt>
                        <Link to="/my/home" className={companyData.home
                            ? 'active'
                            : ''}>
                            <span className="iconfont">&#xe63b;</span>
                            <span>账户</span>
                        </Link>
                    </dt>
                </dl>
            )
        }
        return (
            <dl className="container footer_container">
                <dt>
                    <Link to="/per/index" className={data.borrow
                        ? 'active'
                        : ''}>
                        <span className="iconfont">&#xe656;</span>
                        <span>借钱</span>
                    </Link>
                </dt>
                <dt>
                    <Link to="/product/list" className={data.repay
                        ? 'active'
                        : ''}>
                        <span className="iconfont">&#xe655;</span>
                        <span>还钱</span>
                    </Link>
                </dt>
                <dt>
                    <Link to="/my/home" className={data.home
                        ? 'active'
                        : ''}>
                        <span className="iconfont">&#xe63b;</span>
                        <span>我的</span>
                    </Link>
                </dt>
            </dl>
        );
    }
})
