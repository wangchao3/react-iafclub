import React from 'react'
import CreateAddressActions from '../../actions/address/create'
import CreateAddressStore from '../../stores/address/create'
import Address from '../../../../components/address'
import {delivery_time} from '../../constants/address'
import Form from '../../../../components/form';
import createAddressDataset from '../../forms/address';
import styles from '../../styles/address/form';
import objectAssign from 'object-assign'
import {findDOMNode} from "react-dom";

export default React.createClass({

	propTypes: {
		onSuccess: React.PropTypes.func,
	},

	getInitialState: function() {
		return CreateAddressStore.getState();
	},

	componentDidMount: function() {
		CreateAddressStore.listen(this.onChange);
	},

	componentWillUnmount: function() {
		CreateAddressStore.unlisten(this.onChange);
	},

	onChange: function(state){
		this.setState(state);
	},

	submit: function(e){
		e.preventDefault();
		const address = this.refs.address.getValue();
		if(!address) return undefined;
		const value = this.refs.form.getValue();
		if(value.isInvalid) return undefined;
		let payload = {};
		payload.data = objectAssign(value.value, address);
		payload.data.isDefault = findDOMNode(this.refs.default).checked;
		payload.next = this.props.onSuccess;
		CreateAddressActions.create(payload);
	},

	render: function(){
		return (
			<form onSubmit={this.submit} className="address-form">
				<Address ref="address" />
				<Form dataset={createAddressDataset} ref="form" />
				<div className="form-group">
					<label className="checkbox-input block"><input type="checkbox" ref="default" />默认地址</label>
				</div>
				<button type="submit" className="btn btn-primary btn-block">添加收货地址</button>
			</form>
		);
	},
})
