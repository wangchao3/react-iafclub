import React from 'react';
import cx from 'classnames';
import style from "../styles/form/radio";

export default React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        defaultValue: React.PropTypes.string,
        valueKey: React.PropTypes.string,
        labelKey: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        onChange: React.PropTypes.func,
    },

    getInitialState: function() {
        const checked = this.props.defaultValue ? this.props.defaultValue : null;
        return {
            checked: checked,
            errMsg: null,
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.defaultValue){
            this.setState({'checked': nextProps.defaultValue});
        }
    },

    render: function() {
        const checked = this.state.checked;
        const errMsg = this.state.errMsg;
        const options = this.props.options.map((option, index) => {
            let value, label;
            if(typeof option === 'string'){
                value = option;
                label = option;
            } else {
                value = option[valueKey];
                label = option[labelKey];
            }
            return (
                <label
                    key={index}
                    className={cx('radio-box', cx({'checked': value === checked, 'disabled': option.disabled}))}
                >
                    <input
                        type="radio"
                        value={value}
                        name={this.props.name}
                        defaultChecked={value === checked}
                        onClick={(e) => this.onCheck(value, e)}
                        style={{"display": "none"}}
                    />
                    <span>{label}</span>
                </label>
            );
        });
        return (
            <div className={cx("form-group", cx({"has-error": errMsg}))}>
                <div className="radio-group">
                    <label>{this.props.label}</label>
                    {options}
                </div>
                <div className={cx('error-message', cx({'hide': !errMsg}))}>{errMsg}</div>
            </div>
        )
    },

    resetError: function() {
        this.setState({errMsg: null});
    },

    setValue: function(value) {
        this.resetError();
        this.setState({checked: null});
        this.setState({checked: value});
    },

    onCheck: function(value, e) {
        let preventDefault = false;
        const onChange = this.props.onChange;
        if(onChange && typeof onChange === 'function') preventDefault = onChange(value, e);
        if(preventDefault) return e.preventDefault();
        this.resetError();
        this.setState({checked: value});
    },

    getValue: function() {
        const value = this.state.checked;
        if(!value && this.props.isRequired) return this.setState({errMsg: '请选择' + this.props.label});
        return value;
    }
})
