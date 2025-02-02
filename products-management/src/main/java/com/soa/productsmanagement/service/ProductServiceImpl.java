package com.soa.productsmanagement.service;

import com.soa.productsmanagement.model.Product;
import com.soa.productsmanagement.model.ProductOrder;
import com.soa.productsmanagement.repository.ProductOrderRepository;
import com.soa.productsmanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductOrderRepository productOrderRepository;

    @Override
    public List<Product> allProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product findProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public List<ProductOrder> findOrdersOfUser(Long userId) {
        return productOrderRepository.findAllByUserId(userId);
    }

    @Override
    public List<ProductOrder> findOrdersOfProduct(Long productId) {
        return productOrderRepository.findAllByProductId(productId);
    }

    @Override
    public ProductOrder saveOrder(ProductOrder productOrder) {
        return productOrderRepository.save(productOrder);
    }
}
