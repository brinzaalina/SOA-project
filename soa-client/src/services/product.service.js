import axios from 'axios';

let API_URL = 'http://localhost:8765/api/product/service/';

class ProductService {
    createOrder(productOrder){
        return axios.post(API_URL + 'buy', JSON.stringify(productOrder), {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    filterOrders(userId){
        return axios.get(API_URL + 'user/' + userId, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    filterClients(productId){
        return axios.get(API_URL + 'product/' + productId, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    findProductById(productId){
        return axios.get(API_URL + productId, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    findAllProducts(){
        return axios.get(API_URL + 'all',{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }
}

export default new ProductService();