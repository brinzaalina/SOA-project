package com.soa.productsmanagement.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.soa.productsmanagement.model.Product;
import com.soa.productsmanagement.model.ProductOrder;
import com.soa.productsmanagement.repository.ProductOrderRepository;
import com.soa.productsmanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductOrderRepository productOrderRepository;

    @Value("${lambdaURL}")
    private String lambdaUrl;

    @Autowired
    private RestTemplate restTemplate;

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

    @Override
    public double computeTotalSpent(Long userId) {
        List<ProductOrder> orders = productOrderRepository.findAllByUserId(userId);
        List<Map<String, Object>> orderList = orders.stream()
                .map(order -> {
                    Map<String, Object> productDetails = new HashMap<>();
                    productDetails.put("price", order.getProduct().getPrice());
                    productDetails.put("discount", order.getProduct().getDiscount());

                    Map<String, Object> orderMap = new HashMap<>();
                    orderMap.put("product", productDetails);
                    return orderMap;
                })
                .collect(Collectors.toList());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<Map<String, Object>>> request = new HttpEntity<>(orderList, headers);
        ResponseEntity<String> response = restTemplate.exchange(lambdaUrl, HttpMethod.POST, request, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                return jsonNode.get("totalSpent").asDouble();
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return -1;
            }
        }
        return 0;
    }
}
