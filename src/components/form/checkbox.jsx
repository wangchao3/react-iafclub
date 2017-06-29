import React from 'react';
import cx from 'classnames';
import styles from '../styles/form/checkbox';

export default React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        defaultValue: React.PropTypes.array,
        valueKey: React.PropTypes.string,
        labelKey: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
    },

    getInitialState: function() {
        const defaultValue = this.props.defaultValue || [];
        let checked = [];
        if(defaultValue.length){
            const options = this.props.options
            const defaultValueArr = defaultValue;
            let optionsArr = [];
            if(typeof options[0] === "string"){
                optionsArr = this.props.options;
            } else {
                options.map(function(option){
                    optionsArr.push(option[this.props.valueKey]);
                });
            }
            defaultValueArr.map(function(value){
                if(optionsArr.indexOf(value) > -1) checked.push(value);
            })
        }
        return {
            checked: checked,
            errMsg: null,
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.defaultValue && nextProps.defaultValue.length){
            this.setState({checked: nextProps.defaultValue});
        }
    },

    render: function(){
        const checked = this.state.checked;
        const errMsg = this.state.errMsg;
        const options = this.props.options.map((option, index) => {
            let value, label;
            if(typeof option === 'string') {
                value = option;
                label = option;
            } else {
                value = option[valueKey];
                label = option[labelKey];
            }
            return (
                <label
                    key={index}
                    className={cx('checkbox', cx({
                        'checked': checked.indexOf(value) > -1,
                        'disabled': option.disabled
                    }))}
                >
                    <input value={value}
                        type="checkbox"
                        name={this.props.name}
                        onChange={() => this.onCheck(value)}
                        defaultChecked={this.state.checked.indexOf(value) > -1}
                    />
                    <span>{label}</span>
                </label>
            )
        });
        return (
            <div className={cx('form-group', cx({'has-error': errMsg}))}>
                <div className="checkbox-group">
                    <label>{this.props.label}</label>
                    {options}
                </div>
                <div className={cx('error-message', cx({'hide': !errMsg}))}>{errMsg}</div>
            </div>
        );
    },

    resetError: function() {
        this.setState({errMsg: null});
    },

    onCheck: function(value) {
        this.resetError();
        let checked = this.state.checked;
        const index = checked.indexOf(value);
        if(index === -1){
            checked.push(value);
        } else {
            checked.splice(index, 1);
        };
        this.setState({checked: checked});
    },

    getValue: function() {
        const checked = this.state.checked;
        if(!checked.length && this.props.isRequired) return this.setState({errMsg: '请选择' + this.props.label});
        return checked;
    }
})
