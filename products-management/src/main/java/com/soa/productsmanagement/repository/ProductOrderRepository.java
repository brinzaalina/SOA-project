package com.soa.productsmanagement.repository;

import com.soa.productsmanagement.model.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductOrderRepository extends JpaRepository<ProductOrder, Long> {
    List<ProductOrder> findAllByUserId(Long userId);
    List<ProductOrder> findAllByProductId(Long productId);
}
