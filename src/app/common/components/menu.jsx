import React from 'react'
import MENUS from '../constants/menu'
import {Link} from 'react-router'
import cx from 'classnames'
import styles from '../styles/menu'

export default React.createClass({

    getInitialState: function(){
        return {
            visible: false
        };
    },

    hide: function(){
        this.setState({visible: false});
    },

    getVisible: function(){
        return this.state.visible;
    },

    toggle: function(){
        this.setState({visible: !this.state.visible});
    },

    render: function(){
        const menuNode = MENUS.map((menu, idx) => {
            return (
                <li key={idx}><Link to={menu.to} onClick={this.hide}><i className="iconfont" dangerouslySetInnerHTML={{__html: '&#'+ menu.icon + ';'}} />{menu.label}</Link></li>
            );
        });
        const visibleKlass = this.state.visible ? 'visible' : '';
        return (
            <div className={cx("header-menu", visibleKlass)}>
                <ul>
                    {menuNode}
                </ul>
            </div>
        );
    }
})