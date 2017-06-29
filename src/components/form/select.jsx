import React from 'react';
import cx from 'classnames';
import {findDOMNode} from "react-dom";
import styles from '../styles/form/jselect';

export default React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        defaultValue: React.PropTypes.string,
        valueKey: React.PropTypes.string,
        labelKey: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
    },

    getInitialState: function() {
        return {
            errMsg: null,
        };
    },

    render: function() {
        const errMsg = this.state.errMsg;
        let defaultValue = this.props.defaultValue;
        if(!defaultValue){
            const firstOpt = this.props.options[0];
            if(typeof firstOpt === 'string'){
                defaultValue = firstOpt;
            }else{
                defaultValue = firstOpt[this.props.valueKey];
            }
        }
        const options = this.props.options.map((option, idx) => {
            let value, label;
            if(typeof option === 'string'){
                value = option;
                label = option;
            } else {
                value = option[this.props.valueKey];
                label = option[this.props.labelKey];
            }
            return (
                    <option
                        value={value}
                        key={idx}
                    >
                        {label}
                    </option>
            );
        });
        return (
            <div className={cx('form-group j-select', cx({'has-error': errMsg}))}>
                <label>{this.props.label}</label>
                <div className="select-cmp">
                    <select name={this.props.name} ref="select" defaultValue={defaultValue} onClick={this.resetError}>
                        {options}
                    </select>
                </div>
                <div className={cx('error-message', cx({'hide': !errMsg}))}>{'请选择' + this.props.label}</div>
            </div>
        )
    },

    resetError: function() {
        this.setState({errMsg: null});
    },

    getValue: function() {
        const value = findDOMNode(this.refs.select).value;
        if(!value && this.props.isRequired) return this.setState({errMsg: '请选择' + this.props.label});
        return value;
    }
})
