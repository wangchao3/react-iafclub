import React from 'react'
import HeaderActions from '../../common/actions/header'
import RecordActions from '../actions/record'
import RecordStore from '../stores/record'
import Spinner from '../../../components/spinner'
import alt from '../../alt'
import styles from '../styles/record'
import cx from 'classnames'
import {Link} from 'react-router'
import Footer from '../../../components/footer'
import $ from 'jquery'

const Record = (props)=>{
    const item = props.item;
    return (
        <li onClick={item.toggleActive} data-value={item.last}>
            <span className="check"></span>
            <span>借款</span>{item.amount}
            <span className="textRight">剩余应还{item.last}</span>
        </li>
    );
}

export default React.createClass({

    getInitialState: function() {
        return {total: 0};
        RecordStore.getState();
    },

    componentDidMount: function() {
        RecordStore.listen(this.onChange);
        HeaderActions.setTitle('提前还清欠款');
        RecordActions.init();
    },

    componentWillUnmount: function() {
        RecordStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        const recordList = this.state.recordList;
        if(!recordList) return(<Spinner />);
        const itemNode = recordList.map((item, inx) => {
            item.toggleActive = this.toggleActive;
            return (<Record item={item} key={inx} />);
        });
        return (
            <div className="recordPage body-container">
                <div className="bodyContent">
                    <ul className="payBack">
                        {itemNode}
                        <li onClick={this.allSelect}>
                            <span className="check"></span>
                            <span>全选</span>
                            <span className="textRight">总计{this.state.total}</span>
                        </li>
                    </ul>
                    <button className="btn btn-red btn-block" type="submit">确认还款</button>
                </div>
                <Footer name="return" type="person" />
            </div>
        );
    },

    toggleActive: function(e) {
        e.preventDefault();
        console.log($(this), e.target);
        let node = $(e.target);
        let thisValue = node.attr('data-value')/1;
        let plus = this.state.total + thisValue;
        let minus = this.state.total - thisValue;
        console.log(thisValue, plus, minus, this.state.total);
        if (node.hasClass('active')) {
            node.removeClass('active');
            node.siblings('li:last').removeClass('active');
            this.setState({total: minus});
        } else {
            node.addClass('active');
            this.setState({total: plus});
        }
    },

    allSelect: function(e) {
        e.preventDefault();
        let node = $(e.target);
        if (node.hasClass('active')) {
            node.siblings('li').removeClass('active');
            this.setState({total: 0});
        } else {
            node.siblings('li').addClass('active');
            let total = 0;
            this.state.recordList.map((item) => {
                total = total + item.last/1;
            });
            this.setState({total: total});
        }
        node.toggleClass('active');
    }
})
