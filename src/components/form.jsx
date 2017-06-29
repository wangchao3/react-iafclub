import React from 'react'
import cx from 'classnames'
import Input from './input'

export default React.createClass({

	propTypes: {
		dataset: React.PropTypes.object.isRequired,
		submit: React.PropTypes.func,
	},

	render: function() {
		const inputs = Object.keys(this.props.dataset).map((name, idx) => {
			return (
				<Input data={this.props.dataset[name]} name={name} ref={name + 'input'} key={idx} />
			)
		});
		return (
			<div className="form-section">
				{inputs}
			</div>
		)
	},

	getValue: function(){
		let value = {};
		let isInvalid = false;
		Object.keys(this.props.dataset).map((name, idx) => {
			const data = this.refs[name + 'input'].getValue();
			if(!data){
				isInvalid = true;
			}else{
				value[name] = data;
			}
		});
		return {
			isInvalid: isInvalid,
			value: value,
		}
	}
})
