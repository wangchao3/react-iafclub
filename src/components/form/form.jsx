import React from 'react'
import cx from 'classnames'
import Input from './input'
import obejctAssign from "object-assign";
import {Promise} from "es6-promise";

export default React.createClass({

    propTypes: {
        dataset: React.PropTypes.object.isRequired,
        submit: React.PropTypes.func,
    },

    render: function() {

        const inputs = Object.keys(this.props.dataset).map((name, idx) => {
            return (
                <Input option={this.props.dataset[name]} name={name} ref={name + 'input'} key={idx} />
            )
        });
        if(!this.props.submit){
            return (
                <div className="form-section">
                    {inputs}
                </div>
            )
        }
        return (
            <form onSubmit={this.onsubmit}>
                <div className="form-section">
                    {inputs}
                    {this.props.children}
                </div>
            </form>
        );
    },

    onsubmit: function(){
        if(!this.props.submit) return undefined;
        const value = this.getValue();
        if(!value instanceof Promise) return this.props.submit(value);
        value.then(this.props.submit);
    },

    getValue: function(){
        let value = {};
        let isInvalid = false;
        let promises = []
        Object.keys(this.props.dataset).map((name, idx) => {
            const data = this.refs[name + 'input'].getValue();
            if(data && typeof data.then === "function"){
                const promise = new Promise(function(fullfilled, reject){
                    data.then(function(result){
                        fullfilled({key: name, result: result});
                    }, reject);
                });
                promises.push(promise);
            } else {
                if(!data && this.props.dataset[name].isRequired){
                    isInvalid = true;
                }else{
                    value[name] = data;
                }
            }
        });
        if(!promises.length) {
            return {
                isInvalid: isInvalid,
                value: value,
            }
        }
        return new Promise((fullfilled, reject) =>{
            Promise.all(promises).then((results) => {
                results.map((data) => {
                    value[data.key] = data.result;
                });
                fullfilled({value: value, isInvalid: isInvalid});
            }, reject)
        });
    }
})
