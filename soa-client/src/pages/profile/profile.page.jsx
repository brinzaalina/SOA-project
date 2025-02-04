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
            <div className="col-md-12">
                <div className="jumbotron">
                    <h1 className="display-4">Hello, {this.state.user.name}</h1>
                </div>
                {orders.loading && <em>Loading orders...</em>}
                {orders.length > 0 &&
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Buy Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, index) =>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{order.product.name}</td>
                                <td>{order.product.brand}</td>
                                <td>{order.product.category}</td>
                                <td>{order.product.price}</td>
                                <td>{order.dateOfIssue}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
                {orders.length === 0 && !orders.loading &&
                    <div>
                        <strong>There are no orders yet!</strong>
                    </div>
                }
            </div>
        )
    }
}