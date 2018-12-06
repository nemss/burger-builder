import React, {Component} from 'react';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

export default class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}

	render() {
		return (
			<>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opaciy: this.props.show ? '1' : '0'
					}}>
					{this.props.children}
				</div>
			</>
		);
	}
}