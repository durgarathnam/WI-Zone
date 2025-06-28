package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.WiFiScheme;

@Repository
public interface WiFiSchemeRepo extends JpaRepository<WiFiScheme, Long> {
  Optional<WiFiScheme> findBySchemeName(String name);

  
}
