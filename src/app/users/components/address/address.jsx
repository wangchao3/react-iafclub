import React from 'react'
import cx from 'classnames'

export default React.createClass({
	propTypes: {
		address: React.PropTypes.object.isRequired,
		index: React.PropTypes.number,
		id: React.PropTypes.number,
		onClick: React.PropTypes.func,
	},

	onClick: function(e){
		e.preventDefault();
		if(!this.props.onClick) return undefined;
		this.props.onClick(this.props.index, this.props.address);
	},

	render: function(){
		const address = this.props.address;
		return (
			<div className={cx("address", this.props.className)}>
				<a href="#" onClick={this.onClick}>
					<p>
						<span>{address.province}</span>
						<span>{address.city}</span>
						<span>{address.region}</span><br />
						<span>{address.address}</span>
					</p>
					<p>联系人：{address.consignee}</p>
					<p>手机号：{address.mobilePhone}</p>
				</a>
				{this.props.children ? this.props.children : ''}
			</div>
		);
	}
})
