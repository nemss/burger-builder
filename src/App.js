import React, {Component, lazy, Suspense} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index';
import {waitingComponent} from "./shared/utility";

const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}


	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={waitingComponent(Auth)}/>
				<Route path="/" exact component={BurgerBuilder}/>
				<Redirect to="/"/>
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/checkout" component={waitingComponent(Checkout)}/>

					<Route path="/orders" component={waitingComponent(Orders)}/>
					<Route path="/logout" component={Logout}/>
					<Route path="/auth" component={waitingComponent(Auth)}/>
					<Route path="/" exact component={BurgerBuilder}/>
					<Redirect to="/"/>
				</Switch>
			);
		}

		return (
			<div>
				<Layout>
					{routes}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
