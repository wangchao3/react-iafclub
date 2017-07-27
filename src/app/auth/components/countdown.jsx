import React from 'react'

export default React.createClass({

    propTypes: {
        end: React.PropTypes.instanceOf(Date)
    },

    getInitialState: function() {
        return {day: 0, hour: 0, minute: 0, second: 0};
    },

    getLeftDateTime: function() {
        const now = new Date();
        const end = this.props.end;
        const left = end.getTime() - now.getTime();
        if (left < 0)
            return false;
        const day = Math.floor(left / (1000 * 60 * 60 * 24));
        const hour = Math.floor((left / (1000 * 60 * 60)) % 24);
        const minute = Math.floor((left / (1000 * 60)) % 60);
        const second = Math.floor(left / 1000 % 60);
        const state = {
            day: day,
            hour: hour,
            minute: minute,
            second: second
        };
        this.setState(state);
    },

    countDown: undefined,

    componentDidMount: function() {
        this.getLeftDateTime();
        this.countDown = setInterval(this.getLeftDateTime, 1000);
    },

    componentWillUnmount: function() {
        if (this.countDown)
            clearInterval(this.countDown);
        }
    ,

    formatDateTimeStr: function(num) {
        return num < 10
            ? '0' + num.toString()
            : num.toString();
    },

    render: function() {
        return (
            <div className="count-down">
                <span>
                    <b>{this.state.day}</b>
                    <i>天</i>
                </span>
                <span>
                    <b>{this.formatDateTimeStr(this.state.hour)}</b>
                    <i>小时</i>
                </span>
                <span>
                    <b>{this.formatDateTimeStr(this.state.minute)}</b>
                    <i>分</i>
                </span>
                <span>
                    <b>{this.formatDateTimeStr(this.state.second)}</b>
                    <i>秒</i>
                </span>
            </div>
        );
    }
})
