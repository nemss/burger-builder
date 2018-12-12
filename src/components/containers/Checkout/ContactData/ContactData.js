import React, {Component} from 'react';

import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner.css';
import classes from './ContactData.css';
import axios from '../../../../axios-orders';
import Input from '../../../UI/Input/Input';

export default class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minlength: 5,
					maxlength: 5
				},
				valid: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: ''
			}
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		this.setState({loading: true});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		};
		axios.post('/orders.json', order)
			.then(response => this.setState({loading: false}), this.props.history.push('/'))
			.catch(error => this.setState({loading: false}));
	};

	checkValidity(value, rules) {
		let isValid = true;
		if(rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if(rules.minlength) {
			isValid = value.length >= rules.minlength && isValid;
		}

		if(rules.maxlength) {
			isValid = value.length <= rules.maxlength && isValid;
		}

		return isValid;
	}

	inputChangeHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updateFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updateFormElement.value = event.target.value;
		updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
		updatedOrderForm[inputIdentifier] = updateFormElement;
		this.setState({orderForm: updatedOrderForm})
	};

	render() {
		const formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
				))}
				<Button btnType='Success'>ORDER</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner/>
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		)
	}
}