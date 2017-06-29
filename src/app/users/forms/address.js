import {delivery_time} from '../constants/address'
export default {
	address: {
		type: 'text',
		required: true,
		label: '详细地址',
	},
	consignee: {
		type: 'text',
		required: true,
		label: '收货人',
	},
	mobilePhone: {
		type: 'mobile',
		label: '手机号码',
	},
	preferDeliveryTime: {
		type: 'select',
		options: delivery_time,
	}
}
