import React from "react";
import ProductService from "../../services/product.service";

export default class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            product: JSON.parse(localStorage.getItem("currentProduct")),
            clients: []
        }
    }

    componentDidMount() {
        this.findClientsOfProduct();
    }

    findClientsOfProduct() {
        ProductService.filterClients(this.state.id).then(clients => {
            this.setState({clients: clients.data});
        });
    }

    render() {
        const {clients} = this.state;
        return (
            <div className="col-md-12">
                <div className="jumbotron">
                    <h1 className="display-4">{this.state.product.name}</h1>
                    <h4>Description: {this.state.product.description}</h4>
                    <h4>Brand: {this.state.product.brand}</h4>
                    <h4>Price: {this.state.product.price}</h4>
                </div>
                <div><h5>Clients that bought this product so far: </h5></div>
                {clients.length > 0 &&
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Client Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {clients.map((client, index) =>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{client}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
                {clients.length == 0 &&
                    <div>No clients bought this product yet</div>
                }
            </div>
        );
    }
}