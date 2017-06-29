import React from 'react'
import AddressActions from './actions/address'
import AddressStore from './stores/address'
import cx from 'classnames'
import styles from './styles/address'
import Select from './selector'
import alt from "../app/alt"

const Options = React.createClass({

	propTypes: {
		options: React.PropTypes.array.isRequired,
		onChanged: React.PropTypes.func.isRequired,
		depth: React.PropTypes.number,
		value: React.PropTypes.number,
		isRequired: React.PropTypes.bool,
	},

	onChanged: function(value){
		this.props.onChanged(value, this.props.depth);
	},

	render: function(){
		const options = this.props.options.map((option) => {
			return (<option value={option.id} key={option.id}>{option.name}</option>);
		})
		return (
			<Select
				onChange={this.onChanged}
				value={this.props.value}
				options={options} />
		);
	}
})

export default React.createClass({

	propTypes: {
		onChanged: React.PropTypes.func,
		locationId: React.PropTypes.number,

	},

	getInitialState: function() {
		return AddressStore.getState();
	},

	componentDidMount: function() {
		AddressStore.listen(this.onChange);
		const locationId = this.props.locationId;
		if(locationId){
			AddressActions.recovery(locationId);
		} else {
			AddressActions.fetch({id:0, depth: 0});
		}
	},

	componentWillUnmount: function() {
		AddressStore.unlisten(this.onChange);
		alt.recycle(AddressStore);
	},

	onChange: function(state) {
		this.setState(state);
	},

	value: [],

	onChanged: function(value, depth){
		this.value[depth] = value;
		const len = Object.keys(this.state.data).length;
		if(depth < len){
			for(var i=depth; i<len; i++){
				this.value[i+1] = null;
			}
		}
		AddressActions.fetch({id: value, depth: depth + 1});
		AddressActions.setError(null);
		if(!this.props.onChanged) return undefined;
		this.props.onChanged(e.target.value, depth);
	},

	getValue: function(){
		let error = null;
		const isRequired = this.props.isRequired === false ? false : true;
		if(isRequired && !value.province){
			error = '请选择省份';
		}else if(isRequired && !value.city){
			error = '请选择城市';
		}else if(isRequired && Object.keys(this.state.data).length > 2 && !value.region){ //for now
			error = '请选择区县';
		}
		if(error) return AddressActions.setError(error);
		if(!this.value.length && this.props.locationId) return {region: this.props.locationId};
		const value = {
			province: this.value[0],
			city: this.value[1],
			region: this.value[2],
		}
		return value;
	},

	render: function() {
		if(!this.state.loaded) return (<p className="text-center">初始化组件中...</p>)
		const data = this.state.data;
		const options = Object.keys(data).map((key, idx) => {
			return (
				<Options
					onChanged={this.onChanged}
					options={data[key]}
					depth={idx}
					value={this.state[key]}
					key={idx} />
			);
		});

		return (
			<div className={cx("form-group address-selector", cx({'has-error': this.state.error}))}>
				<div className="address-selector">
					{options}
				</div>
				<div className="error-message">{this.state.error}</div>
			</div>
		);
	}
})
