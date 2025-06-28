package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class WiFiSchemeRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long wifiSchemeRequestId;
    private LocalDate requestDate;
    private String status;
    private String comments;
    @Lob
    private String proof;
    private String streetName;
    private String landmark;
    private String city;
    private String state;
    private String zipCode;
    private LocalDate preferredSetupDate;
    private String timeSlot;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "wifiSchemeId")
    private WiFiScheme wifiScheme;

    

}
