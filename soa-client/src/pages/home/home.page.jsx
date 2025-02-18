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
            <div style={{maxWidth: "1000px", margin: "30px auto", padding: "20px"}}>
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

                {/* Loading Message */}
                {products.loading && <em style={{fontSize: "1.2rem", color: "#56316c"}}>Loading products...</em>}

                {/* Product List */}
                {products.length > 0 && (
                    <div style={{marginTop: 50}}>
                        <h2 style={{marginBottom: 30, textAlign: "center", color: "#56316c"}}>
                            Welcome to the website! Please choose the product you want to buy from the following list:
                        </h2>
                        <table style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "10px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            overflow: "hidden"
                        }}>
                            <thead style={{backgroundColor: "#56316c", color: "white"}}>
                            <tr>
                                <th style={{padding: "10px", textAlign: "left"}}>#</th>
                                <th style={{padding: "10px", textAlign: "left"}}>Product Name</th>
                                <th style={{padding: "10px", textAlign: "left"}}>Brand</th>
                                <th style={{padding: "10px", textAlign: "left"}}>Category</th>
                                <th style={{padding: "10px", textAlign: "left"}}>Price</th>
                                <th style={{padding: "10px", textAlign: "left"}}>Description</th>
                                <th style={{padding: "10px", textAlign: "left"}}>Discount</th>
                                <th style={{padding: "10px", textAlign: "left"}}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product, index) => (
                                <tr key={index} style={{
                                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                                    borderBottom: "1px solid #ddd"
                                }}>
                                    <th style={{padding: "10px", textAlign: "left"}}>{index + 1}</th>
                                    <td style={{padding: "10px", textAlign: "left"}}>{product.name}</td>
                                    <td style={{padding: "10px", textAlign: "left"}}>{product.brand}</td>
                                    <td style={{padding: "10px", textAlign: "left"}}>{product.category}</td>
                                    <td style={{
                                        padding: "10px",
                                        textAlign: "left",
                                        color: "#4caf50",
                                        fontWeight: "bold"
                                    }}>
                                        ${product.price}
                                    </td>
                                    <td style={{padding: "10px", textAlign: "left"}}>{product.description}</td>
                                    <td style={{padding: "10px", textAlign: "left"}}>{product.discount}</td>
                                    <td style={{padding: "10px", textAlign: "left"}}>
                                        <button style={{
                                            backgroundColor: "#56316c",
                                            color: "white",
                                            padding: "8px 15px",
                                            marginRight: "10px",
                                            borderRadius: "5px",
                                            border: "none",
                                            cursor: "pointer",
                                            transition: "background 0.3s ease-in-out"
                                        }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = "#4a148c"}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = "#56316c"}
                                                onClick={() => this.buy(product)}>
                                            Buy
                                        </button>
                                        <button style={{
                                            backgroundColor: "#9575cd",
                                            color: "white",
                                            padding: "8px 15px",
                                            borderRadius: "5px",
                                            border: "none",
                                            cursor: "pointer",
                                            transition: "background 0.3s ease-in-out"
                                        }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = "#7e57c2"}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = "#9575cd"}
                                                onClick={() => this.detail(product)}>
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        );
    }
}