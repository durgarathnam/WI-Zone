package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.WiFiSchemeRequestException;
import com.examly.springapp.model.WiFiSchemeRequest;
import com.examly.springapp.repository.WiFiSchemeRequestRepo;
import java.util.Collections;
import java.util.List;

@Service
public class WiFiSchemeRequestServiceImpl implements WiFiSchemeRequestService {
    @Autowired
    private WiFiSchemeRequestRepo wifiSchemeRequestRepo;

    @Override
    public WiFiSchemeRequest addWiFiSchemeRequest(WiFiSchemeRequest wiFiSchemeRequest)
            throws WiFiSchemeRequestException {
        if (wiFiSchemeRequest == null) {
            throw new WiFiSchemeRequestException("Invalid WifiSchemeRequest");
        }
        return wifiSchemeRequestRepo.save(wiFiSchemeRequest);
    }

    @Override
    public WiFiSchemeRequest getWiFiSchemeRequestById(Long wifiSchemeRequestId) throws WiFiSchemeRequestException {
        if (wifiSchemeRequestId <= 0) {
            throw new WiFiSchemeRequestException("Invalid wifiSchemeRequestId");
        }
        WiFiSchemeRequest wifiSchemeRequestById = wifiSchemeRequestRepo.findById(wifiSchemeRequestId).orElse(null);
        if (wifiSchemeRequestById == null) {
            throw new WiFiSchemeRequestException(
                    "WiFi Scheme Request with " + wifiSchemeRequestId + " does not exists");
        }
        return wifiSchemeRequestById;
    }

    @Override
    public List<WiFiSchemeRequest> getAllWiFiSchemeRequests() {
        return wifiSchemeRequestRepo.findAll();
    }

    @Override
    public WiFiSchemeRequest updateWiFiSchemeRequest(Long wifiSchemeRequestId, WiFiSchemeRequest wiFiSchemeRequest) {
        WiFiSchemeRequest wiFiSchemeRequestFound = wifiSchemeRequestRepo.findById(wifiSchemeRequestId).orElse(null);
        if (wiFiSchemeRequestFound == null) {
            return null;
        }
        wiFiSchemeRequestFound.setRequestDate(wiFiSchemeRequest.getRequestDate());
        wiFiSchemeRequestFound.setStatus(wiFiSchemeRequest.getStatus());
        wiFiSchemeRequestFound.setComments(wiFiSchemeRequest.getComments());
        wiFiSchemeRequestFound.setProof(wiFiSchemeRequest.getProof());
        wiFiSchemeRequestFound.setStreetName(wiFiSchemeRequest.getStreetName());
        wiFiSchemeRequestFound.setLandmark(wiFiSchemeRequest.getLandmark());
        wiFiSchemeRequestFound.setCity(wiFiSchemeRequest.getCity());
        wiFiSchemeRequestFound.setState(wiFiSchemeRequest.getState());
        wiFiSchemeRequestFound.setZipCode(wiFiSchemeRequest.getZipCode());
        wiFiSchemeRequestFound.setPreferredSetupDate(wiFiSchemeRequest.getPreferredSetupDate());
        wiFiSchemeRequestFound.setTimeSlot(wiFiSchemeRequest.getTimeSlot());

        return wifiSchemeRequestRepo.save(wiFiSchemeRequestFound);
    }

    @Override
    public boolean deleteWiFiSchemeRequest(Long wifiSchemeRequestId) {
        WiFiSchemeRequest wiFiSchemeRequestFound = wifiSchemeRequestRepo.findById(wifiSchemeRequestId).orElse(null);
        if (wiFiSchemeRequestFound == null) {
            return false;
        }
        wifiSchemeRequestRepo.deleteById(wifiSchemeRequestId);
        return true;
    }

    @Override
    public List<WiFiSchemeRequest> getWiFiSchemeRequestByUserId(Long userId) {
        List<WiFiSchemeRequest> requests = wifiSchemeRequestRepo.findByUser_userId(userId);
        requests.forEach(System.out::println);
        if (requests.isEmpty()) {
            return Collections.emptyList();
        }
        return requests;
    }

}
