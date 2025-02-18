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
            <div style={{maxWidth: "900px", margin: "30px auto", padding: "20px"}}>
                <div style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center"
                }}>
                    <h1 style={{color: "#56316c", fontSize: "2.5rem", marginBottom: "10px"}}>
                        {product.name || "Unknown Product"}
                    </h1>
                    <h4 style={{color: "#444", fontWeight: "500"}}>
                        Description: {product.description || "No description available"}
                    </h4>
                    <h4 style={{color: "#444", fontWeight: "500"}}>
                        Brand: {product.brand || "Unknown"}
                    </h4>
                    <h4 style={{color: "#4caf50", fontWeight: "600"}}>
                        Price: {product.price !== undefined ? `$${product.price}` : "Not available"}
                    </h4>
                </div>

                <h5 style={{marginTop: "20px", fontSize: "1.2rem", color: "#56316c"}}>
                    Clients that bought this product so far:
                </h5>

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                {!errorMessage && clients.length > 0 && (
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
                            <th style={{padding: "10px", textAlign: "left"}}>Client Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map((client, index) => (
                            <tr key={index} style={{
                                backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                                borderBottom: "1px solid #ddd"
                            }}>
                                <th style={{padding: "10px", textAlign: "left"}}>{index + 1}</th>
                                <td style={{padding: "10px", textAlign: "left"}}>{client}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

        );
    }
}
