import React from 'react';
import cx from 'classnames';
import styles from '../styles/form/text';

export default React.createClass({

    getInitialState: function() {
        return {
            errMsg: null,
            value: this.props.defaultValue,
        };
    },

    propTypes: {
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        label: React.PropTypes.string,
        defaultValue: React.PropTypes.string,
        regex: React.PropTypes.instanceOf(RegExp),
        isRequired: React.PropTypes.bool,
        classNames: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onValid: React.PropTypes.func,
        type: React.PropTypes.string,
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.defaultValue !== null && nextProps.defaultValue !== undefined){
            this.setState({value: nextProps.defaultValue});
        }
    },

    render: function() {
        const placeholder = this.props.placeholder ? this.props.placeholder : this.props.label;
        if(this.props.type === "textarea") {
            return (
                <div className={cx("form-group", this.props.classNames, cx({'has-error': this.state.errMsg}))}>
                    <textarea type={this.props.type || "text"} ref="input" placeholder={placeholder} className="form-control textarea" value={this.state.value} onChange={this.change} onFocus={this.resetError}></textarea>
                    <div className={cx("error-message", cx({'hide': !this.state.errMsg}))}>{this.state.errMsg}</div>
                </div>
            );
        }
        return (
            // <div className={cx("form-group", this.props.classNames, cx({'has-error': this.state.errMsg}))}>
            //     <input type={this.props.type || "text"} ref="input" placeholder={placeholder} className="form-control" value={this.state.value} onChange={this.change} onFocus={this.resetError} />
            //     <div className={cx("error-message", cx({'hide': !this.state.errMsg}))}>{this.state.errMsg}</div>
            // </div>
            <div>
                <div className={cx("item-input", this.props.classNames, cx({'has-error': this.state.errMsg}))}>
                    <span className="input-label">{this.props.label}</span>
                    <input type={this.props.type || "text"} ref="input" placeholder={placeholder} value={this.state.value} onChange={this.change} onFocus={this.resetError} />
                </div>
                <div className={cx("error-message", cx({'hide': !this.state.errMsg}))}>{this.state.errMsg}</div>
            </div>
        );
    },

    change: function(e){
        const value = e.target.value;
        this.setState({value: value});
        if(this.props.onChange && typeof this.props.onChange === "function"){
            this.props.onChange(value);
        };
        if(this.props.onValid && typeof this.props.onValid === "function") {
            const message = this.props.onValid(value);
            this.setState({errMsg: message});
        };
    },

    resetError: function() {
        this.setState({errMsg: null});
    },

    getValue: function() {
        const value = this.state.value;
        if((!value || !value.trim()) && this.props.isRequired) return this.setState({'errMsg': '请填写' + this.props.label});
        if(value && this.props.regex && !this.props.regex.test(value)) return this.setState({'errMsg': this.props.label + '格式错误'});
        if(this.state.errMsg) return null;
        if(this.props.onValid){
            const message = this.props.onValid(value);
            if(message) return this.setState({errMsg: message});
        }
        return value;
    },

})
