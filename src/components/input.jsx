import React from 'react'
import cx from 'classnames'
import Select from './selector'
import {validateMobile} from '../utils/validators'
import {findDOMNode} from "react-dom";

export default React.createClass({

    propTypes: {
        data: React.PropTypes.object.isRequired,
        name: React.PropTypes.string.isRequired,
    },

    getInitialState: function() {
        return {
            error: null,
        };
    },

    render: function(){
        const data = this.props.data;
        const errorClassname = cx({'has-error': this.state.error});
        if(data.type === 'select'){
            const options = data.options.map((option, idx) => {
                if(typeof option === 'string'){
                    return (<option value={option} key={idx}>{option}</option>)
                };
                return (<option value={option.value} key={idx}>{option.label}</option>);
            });
            return (
                <div className={cx("form-group", errorClassname)}>
                    <Select name={this.props.name} ref="input" options={options} />
                    <div className="error-message">{this.state.error}</div>
                </div>
            )
        };
        return (
            <div className={cx("form-group", errorClassname)}>
                <input type="text" ref="input" placeholder={data.placeholder ? data.placeholder : data.label} className="form-control" defaultValue={data.default} />
                <div className="error-message">{this.state.error}</div>
            </div>
        );
    },

    getValue: function(){
        const data = this.props.data;
        const value = data.type === 'select' ? this.refs.input.getValue() : findDOMNode(this.refs.input).value.trim();
        if(!value.length && data.required) {
            const errorMsg = data.errors && data.errors.empty ? data.errors.empty : data.label + '不可为空';
            return this.setState({error: errorMsg});
        }
        if(data.type === 'mobile' && !validateMobile(value)) {
            const errorMsg = '手机号码格式错误';
            return this.setState({error: errorMsg});
        }
        if(value.length && data.regex && !regex.test(value)) {
            const errorMsg = data.errors && data.errors.invalid ? data.errors.invalid : data.label + '格式错误';
            return this.setState({error: errorMsg});
        }
        return value;
    }
})
