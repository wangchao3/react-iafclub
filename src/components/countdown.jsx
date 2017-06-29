import React from 'react'
import cx from 'classnames'

const DataTime = React.createClass({
    propTypes: {
        dateTime: React.PropTypes.object.isRequired
    },

    formatDateTimeStr: function(number){
        return number < 10 ? '0' + number.toString() : number.toString(); 
    },

    render: function(){
        const dataTime = this.props.dateTime;
        const year = dataTime.year;
        const month = dataTime.month;
        const day = dataTime.day;
        const hour = dataTime.hour;
        const minute= dataTime.minute;
        const second = dataTime.second;
        return(
            <div className="datetime">
                <span className={cx(cx({'hide': !year}), 'year')}><b>{year}</b><i>年</i></span>
                <span className={cx(cx({'hide': !year && !month}), 'month')}><b>{month}</b><i>月</i></span>
                <span className='day'><b>{day}</b><i>天</i></span>
                <span className='hour'><b>{this.formatDateTimeStr(hour)}</b><i>小时</i></span>
                <span className='minute'><b>{this.formatDateTimeStr(minute)}</b><i>分</i></span>
                <span className='second'><b>{this.formatDateTimeStr(second)}</b><i>秒</i></span>
            </div>
        );
    }

})

export default React.createClass({
    propTypes: {
        end: React.PropTypes.instanceOf(Date).isRequired
    },

    getInitialState: function() {
        return {
            year: 0,
            month:0,
            day:0,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0 
        };
    },

    countdown: undefined,

    componentDidMount: function() {
        this.getLeftDateTime();
        this.countdown = setInterval(this.getLeftDateTime, 1000);
    },

    componentWillUnmount: function() {
        if(this.countdown) clearInterval(this.countdown);
    },

    getLeftDateTime: function(){
        const now = new Date()
        const left = this.props.end.getTime() - now.getTime();
        if(left <= 0) return false;
        const end = this.props.end;
        const millisecondPerDay = 1000 * 60 * 60 * 24;
        let year = end.getFullYear() - now.getFullYear();
        const diffMonth = end.getMonth() - now.getMonth();
        let month = diffMonth >= 0 ? diffMonth : diffMonth + 12;
        year = diffMonth < 0 ? year - 1 : year;
        const diffDay = end.getDate() - now.getDate();
        let day = diffDay >= 0 ? diffDay : diffDay + this.getEndMontDays(end)
        month = diffDay < 0 ? month - 1 : month;
        const diffHuor = end.getHours() - now.getHours();
        day = diffHuor < 0 ? day - 1 : day;
        const hour = Math.floor(left / (1000 * 60 * 60) % 24);
        const minute = Math.floor(left / (1000 * 60) % 60);
        const second = Math.floor(left / 1000 % 60);
        const millisecond = left % 1000;
        const state = {
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second
        };
        this.setState(state);

    },

    getEndMontDays : function(end){
        const year = end.getFullYear();
        const month = end.getMonth();
        const millisecondPerDay = 1000 * 60 * 60 * 24;
        const start = new Date(year, month, 0).getTime();
        const endTime = new Date(year, month + 1, 0).getTime();
        return Math.floor((endTime - start) /  millisecondPerDay);
    },

    render: function(){
        return (
            <div className="countdown">
                <DataTime dateTime={this.state} />
            </div>
        );
    }
})