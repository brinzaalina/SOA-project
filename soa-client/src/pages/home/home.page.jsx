import {User} from "../../models/user";
import React from "react";
import UserService from "../../services/user.service";
import ProductService from "../../services/product.service";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            errorMessage: '',
            infoMessage: '',
            currentUser: new User()
        };
    }

    componentDidMount() {
        UserService.currentUser.subscribe(data => {
            this.setState({currentUser: data});
        });

        this.getAllProducts();
    }

    getAllProducts() {
        this.setState({products: {loading: true}});

        ProductService.findAllProducts().then(products => {
            this.setState({products: products.data});
        });
    }

    buy(product) {
        if (!this.state.currentUser) {
            this.setState({errorMessage: 'You must be logged in to buy a product'});
            return;
        }

        localStorage.setItem("currentProduct", JSON.stringify(product));
        this.props.history.push('/payment' + product.id);
    }

    detail(product) {
        localStorage.setItem("currentProduct", JSON.stringify(product));
        this.props.history.push('/detail' + product.id);
    }

    render() {
        const { products, errorMessage, infoMessage } = this.state;
        return (
            <div className="col-md-12">
                {infoMessage &&
                    <div className="alert alert-success">
                        <strong>Success! </strong> {infoMessage}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                {errorMessage &&
                    <div className="alert alert-danger">
                        <strong>Error! </strong> {errorMessage}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                {products.loading && <em>Loading products...</em>}
                {products.length &&
                    <div> style={{marginTop: 50}}>
                        <h2 style={{marginBottom: 60}}>Welcome to the website! Please choose the product you want to buy from the following list:</h2>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Description</th>
                                <th scope="col">Discount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.map((product, index) =>
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.category}</td>
                                        <td>${product.price}</td>
                                        <td>{product.description}</td>
                                        <td>{product.discount}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.buy(product)}>Buy</button>
                                            <button className="btn btn-info" onClick={() => this.detail(product)}>Detail</button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
}