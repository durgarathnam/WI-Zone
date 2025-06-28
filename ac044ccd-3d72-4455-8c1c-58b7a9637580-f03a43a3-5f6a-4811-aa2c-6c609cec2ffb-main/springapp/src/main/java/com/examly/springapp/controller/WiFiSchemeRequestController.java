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

import com.examly.springapp.exceptions.WiFiSchemeRequestException;
import com.examly.springapp.model.WiFiSchemeRequest;
import com.examly.springapp.service.WiFiSchemeRequestService;

@RestController
@RequestMapping("/api/wifiSchemeRequest")
public class WiFiSchemeRequestController {
    @Autowired
    private WiFiSchemeRequestService wifiSchemeRequestService;

    @PostMapping
    public ResponseEntity<WiFiSchemeRequest> addWiFiSchemeRequest(@RequestBody WiFiSchemeRequest wifiSchemeRequest)
            throws WiFiSchemeRequestException {
        WiFiSchemeRequest wifiSchemeRequestadded = wifiSchemeRequestService.addWiFiSchemeRequest(wifiSchemeRequest);
        if (wifiSchemeRequestadded == null) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(201).body(wifiSchemeRequestadded);
    }

    @GetMapping("/{wifiSchemeRequestId}")
    public ResponseEntity<WiFiSchemeRequest> getWiFiSchemeRequestById(@PathVariable Long wifiSchemeRequestId)
            throws WiFiSchemeRequestException {
        WiFiSchemeRequest wiFiSchemeRequestById = wifiSchemeRequestService
                .getWiFiSchemeRequestById(wifiSchemeRequestId);
        return ResponseEntity.status(200).body(wiFiSchemeRequestById);
    }

    @GetMapping
    public ResponseEntity<List<WiFiSchemeRequest>> getAllWiFiSchemeRequests() {
        List<WiFiSchemeRequest> allWiFiSchemeRequests = wifiSchemeRequestService.getAllWiFiSchemeRequests();
        if (allWiFiSchemeRequests.isEmpty()) {
            return ResponseEntity.status(400).build();
        } else {
            return ResponseEntity.status(200).body(allWiFiSchemeRequests);
        }
    }

    @PutMapping("/{wifiSchemeRequestId}")
    public ResponseEntity<WiFiSchemeRequest> updateWiFiSchemeRequest(@PathVariable Long wifiSchemeRequestId,
            @RequestBody WiFiSchemeRequest wifiSchemeRequest) {
        WiFiSchemeRequest updatedWiFiSchemeRequest = wifiSchemeRequestService
                .updateWiFiSchemeRequest(wifiSchemeRequestId, wifiSchemeRequest);
        if (updatedWiFiSchemeRequest == null) {
            return ResponseEntity.status(404).build();
        } else {
            return ResponseEntity.status(200).body(updatedWiFiSchemeRequest);
        }
    }

    @DeleteMapping("/{wifiSchemeRequestId}")
    public ResponseEntity<Boolean> deleteWiFiSchemeRequest(@PathVariable Long wifiSchemeRequestId) {
        boolean isDeleteWiFiSchemeRequest = wifiSchemeRequestService.deleteWiFiSchemeRequest(wifiSchemeRequestId);
        if (!isDeleteWiFiSchemeRequest) {
            return ResponseEntity.status(404).body(isDeleteWiFiSchemeRequest);
        } else {
            return ResponseEntity.status(200).body(isDeleteWiFiSchemeRequest);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WiFiSchemeRequest>> getWiFiSchemeRequestByUserId(@PathVariable Long userId) {
        List<WiFiSchemeRequest> allRequestsByUser = wifiSchemeRequestService.getWiFiSchemeRequestByUserId(userId);
        if (allRequestsByUser.isEmpty()) {
            return ResponseEntity.status(404).build();
        } else {
            return ResponseEntity.status(200).body(allRequestsByUser);
        }
    }

}
