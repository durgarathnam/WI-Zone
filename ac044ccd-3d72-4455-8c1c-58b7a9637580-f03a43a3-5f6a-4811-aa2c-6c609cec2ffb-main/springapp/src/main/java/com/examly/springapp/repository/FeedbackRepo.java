package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.WiFiScheme;

import jakarta.transaction.Transactional;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {
    List<Feedback> findByUser_userId(Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE Feedback f SET f.wifiScheme = NULL WHERE f.wifiScheme = :wifiScheme")
    void nullifyWiFiSchemeReferences(WiFiScheme wifiScheme);
}
