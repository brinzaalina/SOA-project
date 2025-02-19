package com.soa.productsmanagement.controller;

import com.soa.productsmanagement.model.ProductOrder;
import liquibase.util.CollectionUtil;
import org.hibernate.query.Order;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import com.soa.productsmanagement.intercomm.UserClient;
import com.soa.productsmanagement.service.ProductService;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProductController {
    @Autowired
    private UserClient userClient;

    @Autowired
    private ProductService productService;

    @Autowired
    private DiscoveryClient discoveryClient;

    @Autowired
    private Environment env;

    @Value("${spring.application.name}")
    private String serviceId;

    @GetMapping("/service/port")
    public String getPort() {
        return "Service is working at port: " + env.getProperty("local.server.port");
    }

    @GetMapping("/service/instances")
    public ResponseEntity<?> getInstances() {
        return ResponseEntity.ok(discoveryClient.getInstances(serviceId));
    }

    @GetMapping("/service/user/{userId}")
    public ResponseEntity<?> findTransactionsOfUser(@PathVariable Long userId) {
        return ResponseEntity.ok(productService.findOrdersOfUser(userId));
    }

    @GetMapping("/service/all")
    public ResponseEntity<?> findAllProducts() {
        return ResponseEntity.ok(productService.allProducts());
    }

    @GetMapping("/service/{productId}")
    public ResponseEntity<?> findProductById(@PathVariable Long productId) {
        return ResponseEntity.ok(productService.findProductById(productId));
    }

    @PostMapping("/service/buy")
    public ResponseEntity<?> saveOrder(@RequestBody ProductOrder productOrder) {
        productOrder.setDateOfIssue(LocalDateTime.now());
        productOrder.setProduct(productService.findProductById(productOrder.getProduct().getId()));
        return new ResponseEntity<>(productService.saveOrder(productOrder), HttpStatus.CREATED);
    }

    @GetMapping("/service/product/{productId}")
    public ResponseEntity<?> findClientsOfProduct(@PathVariable Long productId) {
        List<ProductOrder> productOrders = productService.findOrdersOfProduct(productId);
        if (CollectionUtils.isEmpty(productOrders)) {
            return ResponseEntity.notFound().build();
        }
        List<Long> userIdList = productOrders.parallelStream().map(ProductOrder::getUserId).collect(Collectors.toList());
        List<String> userNames = userClient.getUserNames(userIdList);
        return ResponseEntity.ok(userNames);
    }

    @GetMapping("/service/total/{userId}")
    public ResponseEntity<?> computeTotalSpent(@PathVariable Long userId) {
        double total = productService.computeTotalSpent(userId);
        if ( total == -1) {
            return ResponseEntity.internalServerError().build();
        } else {
            return ResponseEntity.ok(total);
        }
    }
}
