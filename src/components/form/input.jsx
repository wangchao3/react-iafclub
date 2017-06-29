import React from 'react';
import cx from 'classnames';
import Select from './select';
import Radio from './radio';
import Checkbox from './checkbox';
import ImageInput from './image-input';
import TextInput from './text';
import FileInput from './file'
import {validateMobile} from '../../utils/validators';
import {isWechat} from '../../app/wechat/services/wechat';

export default React.createClass({

    propTypes: {
        option: React.PropTypes.object.isRequired,
        name: React.PropTypes.string.isRequired,
    },

    render: function(){
        const option = this.props.option;
        const name = this.props.name;
        const type = option.type;
        if(type === 'select'){
            return (
                <Select
                    options={option.options}
                    name={name}
                    valueKey={option.valueKey}
                    labelKey={option.labelKey}
                    label={option.label}
                    isRequired={option.isRequired}
                    defaultValue={option.defaultValue}
                    ref="input" />
            );
        } else if (type === 'radio') {
            return (
                <Radio
                    options={option.options}
                    name={name}
                    label={option.label}
                    valueKey={option.valueKey}
                    labelKey={option.labelKey}
                    isRequired={option.isRequired}
                    defaultValue={option.defaultValue}
                    onChange={option.onChange}
                    ref="input" />
            );
        } else if (type === 'checkbox') {
            return (
                <Checkbox
                    options={option.options}
                    name={name}
                    valueKey={option.valueKey}
                    labelKey={option.labelKey}
                    label={option.label}
                    isRequired={option.isRequired}
                    defaultValue={option.defaultValue}
                    ref="input" />
            );
        } else if (type === 'image') {
            return (
                <ImageInput
                    defaultValue={option.defaultValue}
                    defaultName={option.defaultName}
                    label={option.label}
                    max={option.max}
                    name={name}
                    isRequired={option.isRequired}
                    ref="input" />
            );
        } else if (type === "file") {
            return (
                <FileInput 
                    defaultValue={option.defaultValue}
                    type = {option.fileType}
                    defaultName={option.defaultName}
                    label={option.label}
                    name={name}
                    tip={option.tip}
                    maxSize={option.maxSize}
                    regex={option.regex}
                    isRequired={option.isRequired}
                    ref="input" />
            );
        } else {
            return (
                <TextInput
                    defaultValue={option.defaultValue}
                    label={option.label}
                    type={type}
                    name={name}
                    regex={option.regex}
                    isRequired={option.isRequired}
                    placeholder={option.placeholder}
                    classNames={option.classNames}
                    ref="input" />
            );
        }
    },

    getValue: function() {
        return this.refs.input.getValue();
    }
})
