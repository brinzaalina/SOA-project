package com.soa.productsmanagement.repository;

import com.soa.productsmanagement.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
