import React from "react";
import UserService from "../../services/user.service";
import ProductService from "../../services/product.service";

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        if (!UserService.currentUserValue) {
            this.props.history.push('/');
            return;
        }

        this.state = {
            user: UserService.currentUserValue,
            orders: []
        };
    }

    componentDidMount() {
        this.setState({
            orders: {loading: true}
        });
        const user = this.state.user;
        ProductService.filterOrders(user.id).then(orders => {
            this.setState({orders: orders.data});
        });
    }

    render() {
        const { orders } = this.state;
        return (
            <div style={{maxWidth: "1000px", margin: "30px auto", padding: "20px"}}>
                {/* Greeting Header */}
                <div style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center"
                }}>
                    <h1 style={{color: "#56316c", fontSize: "2.5rem", marginBottom: "10px"}}>
                        Hello, {this.state.user.name}!
                    </h1>
                </div>

                {/* Loading Orders */}
                {orders.loading && <em style={{fontSize: "1.2rem", color: "#56316c"}}>Loading orders...</em>}

                {/* Orders Table */}
                {orders.length > 0 ? (
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
                            <th style={{padding: "10px", textAlign: "left"}}>Buy Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} style={{
                                backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                                borderBottom: "1px solid #ddd"
                            }}>
                                <th style={{padding: "10px", textAlign: "left"}}>{index + 1}</th>
                                <td style={{padding: "10px", textAlign: "left"}}>{order.product.name}</td>
                                <td style={{padding: "10px", textAlign: "left"}}>{order.product.brand}</td>
                                <td style={{padding: "10px", textAlign: "left"}}>{order.product.category}</td>
                                <td style={{padding: "10px", textAlign: "left", color: "#4caf50", fontWeight: "bold"}}>
                                    ${order.product.price}
                                </td>
                                <td style={{
                                    padding: "10px",
                                    textAlign: "left"
                                }}>{new Date(order.dateOfIssue).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    !orders.loading && (
                        <div style={{
                            textAlign: "center",
                            padding: "15px",
                            marginTop: "20px",
                            backgroundColor: "#ffebee",
                            color: "#d32f2f",
                            borderRadius: "5px"
                        }}>
                            <strong>There are no orders yet!</strong>
                        </div>
                    )
                )}
            </div>

        )
    }
}