package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.model.WiFiSchemeRequest;

import jakarta.transaction.Transactional;

@Repository
public interface WiFiSchemeRequestRepo extends JpaRepository<WiFiSchemeRequest, Long> {
    List<WiFiSchemeRequest> findByUser_userId(Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE WiFiSchemeRequest r SET r.wifiScheme = NULL WHERE r.wifiScheme = :wifiScheme")
    void nullifyWiFiSchemeReferences(WiFiScheme wifiScheme);

}
