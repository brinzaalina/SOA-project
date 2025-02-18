import React from "react";

export default class ForumPage extends React.Component {
    state = {
        products: [
            {name: "Product 1", brand: "Brand 1", category: "Category 1", price: 100, link: "localhost:8082/chat"}
        ]
    };

    render() {
        const discussions = this.state;
        return (
            <div style={{maxWidth: "900px", margin: "30px auto", padding: "20px"}}>
                {/* Forum Header */}
                <div style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center"
                }}>
                    <h1 style={{color: "#56316c", fontSize: "2.5rem", marginBottom: "10px"}}>
                        Products Forum
                    </h1>
                    <h4 style={{color: "#444", fontWeight: "500", marginBottom: "10px"}}>
                        Welcome to the forum! Here you can discuss with other people about the products bought from us.
                        Check the product topics below.
                    </h4>
                </div>

                {/* Chat Instruction */}
                <div>
                    <h5 style={{marginTop: "20px", fontSize: "1.2rem", color: "#56316c"}}>
                        Click the link to open the chat:
                    </h5>
                </div>

                {/* Product Discussions Table */}
                {discussions.products.length > 0 ? (
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
                            <th style={{padding: "10px", textAlign: "left"}}>Chat</th>
                        </tr>
                        </thead>
                        <tbody>
                        {discussions.products.map((product, index) => (
                            <tr key={index} style={{
                                backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                                borderBottom: "1px solid #ddd"
                            }}>
                                <th style={{padding: "10px", textAlign: "left"}}>{index + 1}</th>
                                <td style={{padding: "10px", textAlign: "left"}}>{product.name}</td>
                                <td style={{padding: "10px", textAlign: "left"}}>{product.brand}</td>
                                <td style={{padding: "10px", textAlign: "left"}}>{product.category}</td>
                                <td style={{padding: "10px", textAlign: "left"}}>
                                    <a href="http://localhost:8082/chat" style={{
                                        textDecoration: "none",
                                        color: "#56316c",
                                        fontWeight: "bold",
                                        transition: "color 0.3s ease-in-out, text-decoration 0.3s ease-in-out"
                                    }}
                                       onMouseEnter={(e) => {
                                           e.target.style.color = "#a540df";
                                           e.target.style.textDecoration = "underline";
                                       }}
                                       onMouseLeave={(e) => {
                                           e.target.style.color = "#56316c";
                                           e.target.style.textDecoration = "none";
                                       }}>
                                        Chat
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={{
                        textAlign: "center",
                        padding: "15px",
                        marginTop: "20px",
                        backgroundColor: "#ffebee",
                        color: "#d32f2f",
                        borderRadius: "5px"
                    }}>
                        No discussions available yet
                    </div>
                )}
            </div>

        );
    }
}