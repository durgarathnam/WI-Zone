package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exceptions.DuplicateWiFiSchemeException;
import com.examly.springapp.exceptions.WiFiSchemeDeletionException;
import com.examly.springapp.exceptions.WiFiSchemeException;
import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.service.WiFiSchemeService;

@RestController
@RequestMapping("/api/wifiScheme")
public class WiFiSchemeController {

  @Autowired
  private WiFiSchemeService wifiSchemeService;

  @PostMapping
  public ResponseEntity<WiFiScheme> addWiFiScheme(@RequestBody WiFiScheme wifiScheme)
      throws DuplicateWiFiSchemeException, WiFiSchemeException {
    WiFiScheme wifiSchemeFound = wifiSchemeService.addWiFiScheme(wifiScheme);
    return ResponseEntity.status(201).body(wifiSchemeFound);
  }

  @GetMapping("/{wifiSchemeId}")
  public ResponseEntity<WiFiScheme> getWiFiSchemeById(@PathVariable long wifiSchemeId) throws WiFiSchemeException {
    WiFiScheme wifiSchemeFound = wifiSchemeService.getWiFiSchemeById(wifiSchemeId);
    return ResponseEntity.status(200).body(wifiSchemeFound);
  }

  @GetMapping
  public ResponseEntity<List<WiFiScheme>> getAllWiFiSchemes() {
    List<WiFiScheme> wifiSchemeFound = wifiSchemeService.getAllWiFiSchemes();
    if (wifiSchemeFound.isEmpty()) {
      return ResponseEntity.status(400).build();
    }
    return ResponseEntity.status(200).body(wifiSchemeFound);

  }
    
  @PutMapping("/{wifiSchemeId}")
  public ResponseEntity<WiFiScheme> updateWiFiScheme(@PathVariable long wifiSchemeId,
      @RequestBody WiFiScheme wifiScheme) {
    WiFiScheme wifiSchemeUpdated = wifiSchemeService.updateWiFiScheme(wifiSchemeId, wifiScheme);
    if (wifiSchemeUpdated == null) {
      return ResponseEntity.status(404).build();
    }
    return ResponseEntity.status(200).body(wifiSchemeUpdated);
  }

  @DeleteMapping("/{wifiSchemeId}")
  public ResponseEntity<WiFiScheme> deleteWiFiScheme(@PathVariable long wifiSchemeId)
      throws WiFiSchemeDeletionException {
    WiFiScheme wifiSchemeFound = wifiSchemeService.deleteWiFiScheme(wifiSchemeId);
    if (wifiSchemeFound == null) {
      return ResponseEntity.status(404).build();
    }
    return ResponseEntity.status(200).body(wifiSchemeFound);
  }

}
