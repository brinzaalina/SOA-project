package com.soa.productsmanagement.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "product")
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "brand")
    private String brand;

    @Column(name = "description")
    private String description;

    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private Double price;

    @Column(name = "discount")
    private Double discount;
}
