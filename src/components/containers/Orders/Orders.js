import React, {Component} from 'react';

import Order from '../../Order/Order';

export default class Orders extends Component {
	render() {
		return (
			<div>
				<Order/>
				<Order/>
			</div>
		);
	}
}