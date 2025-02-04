import React from "react";

export default class ForumPage extends React.Component {
    state = {
        products: [
            {name: "Product 1", brand: "Brand 1", category: "Category 1", price: 100, link: "localhost:8080/chat"}
        ]
    };

    render() {
        const discussions = this.state;
        return (
            <div className="col-md-12">
                <div className="jumbotron">
                    <h1 className="display-4">Products forum</h1>
                    <h4>Welcome to the forum! Here you can discuss with other people about the products bought from us. Check the product topics below.</h4>
                </div>
                <div><h5>Click the link to open the chat:</h5></div>
                {discussions.products.length > 0 &&
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Category</th>
                            <th scope="col">Chat</th>
                        </tr>
                        </thead>
                        <tbody>
                        {discussions.products.map((product, index) =>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td><a href="http://localhost:8080/chat">Chat</a></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
                {discussions.products.length == 0 &&
                    <div>No discussions available yet</div>
                }
            </div>
        );
    }
}