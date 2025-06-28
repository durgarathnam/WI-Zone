package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class WiFiScheme {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long wifiSchemeId;
    private String schemeName;
    private String description;
    private String region;
    private String speed;
    private String dataLimit;
    private double fee;
    private String availabilityStatus;
}
