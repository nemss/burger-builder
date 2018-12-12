import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import Layout from './components/containers/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/containers/Checkout/Checkout';
import Orders from './components/containers/Orders/Orders';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path='/checkout' component={Checkout}/>
						<Route path='/orders' component={Orders}/>
						<Route path='/' exact component={BurgerBuilder}/>
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
