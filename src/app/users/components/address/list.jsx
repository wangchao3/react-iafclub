import React from 'react'
import AddressListActions from '../../actions/address/list'
import AddressListStore from '../../stores/address/list'
import Spinner from '../../../../components/spinner'
import AddressFrom from './form'
import Address from './address'
import Modal from '../../../../components/modal'
import styles from '../../styles/address/list'
import cx from 'classnames'

export default React.createClass({

	propTypes: {
		onChosen: React.PropTypes.func,
		onSetDefault: React.PropTypes.func,
		showPrimaryOnly: React.PropTypes.bool,
	},

	getInitialState: function() {
		return AddressListStore.getState();
	},

	componentDidMount: function() {
		AddressListStore.listen(this.onChange);
		AddressListActions.fetch({showPrimaryOnly: this.props.showPrimaryOnly, onSetDefault: this.props.onSetDefault});
	},

	componentWillUnmount: function() {
		AddressListStore.unlisten(this.onChange);
	},

	onChange: function(state){
		this.setState(state);
	},

	onChosen: function(index, address){
		AddressListActions.setChosen(index);
		this.props.onChosen(address);
	},

	showAllAddress: function(){
		AddressListActions.showAllAddress();
	},

	showAddressForm: function() {
		this.refs.addressForm.show();
	},

	onSaveSuccess: function(address){
		AddressListActions.saveSuccess(address);
		if(this.refs.addressForm) this.refs.addressForm.hide();
	},

	onDelete: function(index){
		if(confirm('是否确认删除')) AddressListActions.delete(index);
	},

	render: function(){
		const addresses = this.state.addresses;
		const address = this.state.address;
		if(!addresses){
			return (<Spinner />);
		}else if(!addresses.length){
			return (
				<div className="box">
					<AddressFrom onSuccess={this.onSaveSuccess} />
				</div>
			)
		}
		if(this.state.showPrimaryOnly){
			return (
				<div className="address-list-cmp box">
					<Address address={address} key={address.id} />
					<div className="change-address">
						<a className="change-adress-link" onClick={this.showAllAddress}><i className="iconfont">&#xe622;</i>更换</a>
					</div>
				</div>
			)
		};
		const addressesNode = addresses.map((addressItem, index) => {
			return (
				<Address address={addressItem} key={addressItem.id} className={cx("box", cx({'selected': index === this.state.selected}))} index={index} id={addressItem.id} onClick={this.onChosen}>
					<button className="iconfont select-btn" onClick={() => this.onChosen(index, addressItem)}>&#xe61f;</button>
					<div className="delete-address">
						<a className="delete-adress-link" onClick={() => this.onDelete(index)}><i className="iconfont">&#xe61e;</i>删除</a>
					</div>
				</Address>
			);
		});
		return (
			<div className="address-list-cmp all-address">
				{addressesNode}
				<div className="container">
					<button className="btn btn-primary btn-block" onClick={this.showAddressForm}>添加收货地址</button>
				</div>
				<Modal ref="addressForm" title="添加收货地址">
					<AddressFrom onSuccess={this.onSaveSuccess} />
				</Modal>
			</div>
		);
	}
})
