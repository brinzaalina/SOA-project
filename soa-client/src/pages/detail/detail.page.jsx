import React from "react";
import ProductService from "../../services/product.service";

export default class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            product: JSON.parse(localStorage.getItem("currentProduct")) || {}, // ✅ Prevents crashes if null
            clients: [],
            errorMessage: "",
        };
    }

    componentDidMount() {
        this.findClientsOfProduct();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ id: this.props.match.params.id }, () => {
                this.findClientsOfProduct();
            });
        }
    }

    findClientsOfProduct() {
        this.setState({ errorMessage: "" }); // Reset error before request

        ProductService.filterClients(this.state.id)
            .then(response => {
                this.setState({ clients: response.data });
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    this.setState({ clients: [], errorMessage: "No clients bought this product yet." });
                } else {
                    this.setState({ errorMessage: "An error occurred while fetching clients." });
                }
            });
    }

    render() {
        const { clients, product, errorMessage } = this.state;

        return (
            <div className="col-md-12">
                <div className="jumbotron">
                    <h1 className="display-4">{product.name || "Unknown Product"}</h1>
                    <h4>Description: {product.description || "No description available"}</h4>
                    <h4>Brand: {product.brand || "Unknown"}</h4>
                    <h4>Price: {product.price !== undefined ? `$${product.price}` : "Not available"}</h4>
                </div>

                <h5>Clients that bought this product so far:</h5>

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                {!errorMessage && clients.length > 0 && (
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Client Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map((client, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{client}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}
