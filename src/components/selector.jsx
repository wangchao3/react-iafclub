import React from 'react'
import styles from './styles/selector'
import {findDOMNode} from "react-dom";

export default React.createClass({
    propTypes: {
        options: React.PropTypes.node,
        onChange: React.PropTypes.func,
        value: React.PropTypes.number,
    },

    onChange: function(e){
        if(!this.props.onChange) return undefined;
        this.props.onChange(e.target.value);
    },

    render: function() {
        let options = this.props.options;
        if(!options) options = (<option value="-1">请选择</option>)
        return (
            <div className="select-cmp">
                <select ref="select" onChange={this.onChange} defaultValue={this.props.value}>
                    {options}
                </select>
            </div>
        );
    },

    getValue: function(){
        return findDOMNode(this.refs.select).value;
    },
})
