package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.exceptions.WiFiSchemeRequestException;
import com.examly.springapp.model.WiFiSchemeRequest;

public interface WiFiSchemeRequestService {
    WiFiSchemeRequest addWiFiSchemeRequest(WiFiSchemeRequest wiFiSchemeRequest) throws WiFiSchemeRequestException;

    WiFiSchemeRequest getWiFiSchemeRequestById(Long wifiSchemeRequestId) throws WiFiSchemeRequestException;

    List<WiFiSchemeRequest> getAllWiFiSchemeRequests();

    WiFiSchemeRequest updateWiFiSchemeRequest(Long wifiSchemeRequestId, WiFiSchemeRequest wiFiSchemeRequest);

    boolean deleteWiFiSchemeRequest(Long wifiSchemeRequestId);

    List<WiFiSchemeRequest> getWiFiSchemeRequestByUserId(Long userId);

}
