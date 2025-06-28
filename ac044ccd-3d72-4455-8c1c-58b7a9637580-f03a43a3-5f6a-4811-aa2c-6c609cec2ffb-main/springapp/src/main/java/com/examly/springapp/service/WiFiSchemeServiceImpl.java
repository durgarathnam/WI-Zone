package com.examly.springapp.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateWiFiSchemeException;
import com.examly.springapp.exceptions.WiFiSchemeDeletionException;
import com.examly.springapp.exceptions.WiFiSchemeException;
import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.WiFiSchemeRepo;
import com.examly.springapp.repository.WiFiSchemeRequestRepo;

@Service
public class WiFiSchemeServiceImpl implements WiFiSchemeService {

    @Autowired
    private WiFiSchemeRepo wifiSchemeRepo;
    @Autowired
    private WiFiSchemeRequestRepo wifiSchemeRequestRepo;
    @Autowired
    private FeedbackRepo feedbackRepo;

    @Override
    public WiFiScheme addWiFiScheme(WiFiScheme wifiScheme) throws DuplicateWiFiSchemeException, WiFiSchemeException {
        if (wifiScheme == null) {
            throw new WiFiSchemeException("Invalid WiFi Scheme");
        }
        Optional<WiFiScheme> wifiSchemeFound = wifiSchemeRepo.findBySchemeName(wifiScheme.getSchemeName());
        if (wifiSchemeFound.isPresent()) {
            throw new DuplicateWiFiSchemeException("WiFi Scheme Name Already Exists");
        }

        return wifiSchemeRepo.save(wifiScheme);
    }

    @Override
    public WiFiScheme getWiFiSchemeById(Long wifiSchemeId) throws WiFiSchemeException {
        if (wifiSchemeId <= 0) {
            throw new WiFiSchemeException("Invalid wifiSchemeId");
        }
        WiFiScheme wifiScheme = wifiSchemeRepo.findById(wifiSchemeId).orElse(null);
        if (wifiScheme == null) {
            throw new WiFiSchemeException("WiFi Scheme with " + wifiSchemeId + " does not exists");
        }
        return wifiScheme;

    }

    @Override
    public List<WiFiScheme> getAllWiFiSchemes() {
        List<WiFiScheme> wifiSchemes = wifiSchemeRepo.findAll();
        if (wifiSchemes.isEmpty()) {
            return Collections.emptyList();
        }
        return wifiSchemes;

    }

    @Override
    public WiFiScheme updateWiFiScheme(Long wifiSchemeId, WiFiScheme wifiScheme) {
        WiFiScheme wifiSchemeFound = wifiSchemeRepo.findById(wifiSchemeId).orElse(null);
        if (wifiSchemeFound != null) {
            wifiSchemeFound.setSchemeName(wifiScheme.getSchemeName());
            wifiSchemeFound.setDescription(wifiScheme.getDescription());
            wifiSchemeFound.setRegion(wifiScheme.getRegion());
            wifiSchemeFound.setSpeed(wifiScheme.getSpeed());
            wifiSchemeFound.setDataLimit(wifiScheme.getDataLimit());
            wifiSchemeFound.setFee(wifiScheme.getFee());
            wifiSchemeFound.setAvailabilityStatus(wifiScheme.getAvailabilityStatus());
            WiFiScheme wifiSchemeUpdated = wifiSchemeRepo.save(wifiSchemeFound);
            return wifiSchemeUpdated;
        }

        return null;
    }

    @Override
    public WiFiScheme deleteWiFiScheme(Long wifiSchemeId) throws WiFiSchemeDeletionException {
        WiFiScheme wifiSchemeFound = wifiSchemeRepo.findById(wifiSchemeId).orElse(null);
        if (wifiSchemeFound == null) {
            throw new WiFiSchemeDeletionException("Failed to Delete Wifi Scheme " + wifiSchemeId);
        }
        wifiSchemeRequestRepo.nullifyWiFiSchemeReferences(wifiSchemeFound);
        feedbackRepo.nullifyWiFiSchemeReferences(wifiSchemeFound);
        wifiSchemeRepo.deleteById(wifiSchemeId);
        return wifiSchemeFound;
    }

}
