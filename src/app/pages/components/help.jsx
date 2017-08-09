import React from 'react'
import HeaderActions from '../../common/actions/header'
import {Link} from 'react-router'
import {FAQS} from '../constants/faq'
import {APPLYS} from '../constants/apply'
import $ from "jquery"
import styles from '../styles/help'

export default React.createClass({

    componentDidMount: function() {
        HeaderActions.setTitle('帮助中心');
    },

    toggleShow: function(e) {
        let node = $(e.target);
        let info = node.siblings('.answer');
        if (node.hasClass('active')) {
            node.removeClass('active');
            info.slideUp();
        } else {
            node.addClass('active');
            info.slideDown();
        }
    },
    render: function() {
        const ApplyNode = APPLYS.map((item, idx) => {
            return (
                <li className="table-view-cell" key={idx}>
                    <Link className="navigate-right" onClick={this.toggleShow}>
                        {item.question}
                    </Link>
                    <div className="answer">{item.answer}</div>
                </li>
            );
        });
        const FAQNode = FAQS.map((item, idx) => {
            return (
                <li className="table-view-cell" key={idx}>
                    <Link className="navigate-right" onClick={this.toggleShow}>
                        {item.question}
                    </Link>
                    <div className="answer">{item.answer}</div>
                </li>
            );
        });
        return (
            <div className="help body-container">
                <ul className="table-view">
                    <li className="table-view-cell table-view-divider">申请</li>
                    {ApplyNode}
                    <li className="table-view-cell table-view-divider">提现</li>
                    {FAQNode}
                </ul>
            </div>
        );
    }
})
