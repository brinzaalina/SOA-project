package com.soa.productsmanagement.service;

import com.soa.productsmanagement.model.Product;
import com.soa.productsmanagement.model.ProductOrder;

import java.util.List;

public interface ProductService {
    List<Product> allProducts();
    Product findProductById(Long id);
    List<ProductOrder> findOrdersOfUser(Long userId);
    List<ProductOrder> findOrdersOfProduct(Long productId);
    ProductOrder saveOrder(ProductOrder productOrder);
}
