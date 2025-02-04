import React from "react";
import './card-payment.page.css';
import 'react-credit-cards/es/styles-compiled.css';
import {formatCreditCardNumber, formatCVC, formatExpirationDate} from "./utils";
import ProductService from "../../services/product.service";
import {ProductOrder} from "../../models/productOrder";
import UserService from "../../services/user.service";
import Card from "react-credit-cards";
import {render} from "react-dom";

export default class CardPaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            issuer: '',
            focused: '',
            formData: null,
            props: props
        }
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    }

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name
        });
    }

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        alert('Your payment is successful!');
        this.form.reset();
        const id = this.state.props.history.location.pathname.substr(9,1);
        ProductService.findProductById(id).then(product => {
            var order = new ProductOrder(UserService.currentUserValue.id, product.data);
            ProductService.createOrder(order).then(data => {
                this.setState({ infoMessage: 'Order created successfully' });
                this.props.history.push('/profile');
            }, error => {
                this.setState({ errorMessage: 'An error occurred' });
            });
        });
    }

    render() {
        const { name, number, expiry, cvc, focused, issuer } = this.state;
        return (
            <div key='Payment'>
                <div className="App-payment">
                    <h1>Enter your payment details</h1>
                    <h4>Please input your information below:</h4>
                    <Card
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                    />
                    <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <small>Name (as on card):</small>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                pattern="[a-z A-Z-]+"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="form-group">
                            <small>Card Number:</small>
                            <input
                                type="tel"
                                name="number"
                                className="form-control"
                                placeholder="Card Number"
                                pattern="[\d| ]{16,22}"
                                maxLength="19"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="form-group">
                            <small>CVC:</small>
                            <input
                                type="tel"
                                name="cvc"
                                className="form-control"
                                placeholder="CVC"
                                pattern="\d{3}"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="form-group">
                            <small>Expiration Date:</small>
                            <input
                                type="tel"
                                name="expiry"
                                className="form-control"
                                placeholder="MM/YY"
                                pattern="\d\d/\d\d"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <input type="hidden" name="issuer" value={issuer} />
                        <div className="form-actions">
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

render(<CardPaymentPage />, document.getElementById('root'));